import { createContext, PropsWithChildren, use, useState } from 'react';

type TabsContextType = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

const TabsContext = createContext<TabsContextType>({} as TabsContextType);

const useTabsContext = () => use(TabsContext);

type ControlledTabsProps = PropsWithChildren<{
  value: TabsContextType['value'];
  onValueChange: TabsContextType['onValueChange'];
  defaultValue?: never;
}>;

type UncontrolledTabsProps = PropsWithChildren<{
  defaultValue: TabsContextType['defaultValue'];
  value?: never;
  onValueChange?: never;
}>;

const isUncontrolledTabs = (
  props: ControlledTabsProps | UncontrolledTabsProps
): props is UncontrolledTabsProps => {
  return 'defaultValue' in props;
};

const isControlledTabs = (
  props: ControlledTabsProps | UncontrolledTabsProps
): props is ControlledTabsProps => {
  return !('defaultValue' in props);
};

export const Tabs = (props: ControlledTabsProps | UncontrolledTabsProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(() =>
    isUncontrolledTabs(props) ? props.defaultValue! : ''
  );

  if (isUncontrolledTabs(props)) {
    return (
      <TabsContext
        value={{
          value: uncontrolledValue,
          onValueChange: setUncontrolledValue,
        }}
      >
        {props.children}
      </TabsContext>
    );
  } else if (isControlledTabs(props)) {
    return (
      <TabsContext
        value={{ value: props.value, onValueChange: props.onValueChange }}
      >
        {props.children}
      </TabsContext>
    );
  }
  return null;
};

export const List = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

export const Trigger = ({
  children,
  value,
}: PropsWithChildren<{ value: string }>) => {
  const { value: selectedValue, onValueChange } = useTabsContext();

  const isSelected = selectedValue === value;

  return (
    <button
      type="button"
      onClick={() => {
        onValueChange?.(value);
      }}
      style={
        isSelected
          ? {
              fontWeight: 'bold',
            }
          : {}
      }
    >
      {children}
    </button>
  );
};

export const Content = ({
  children,
  value,
}: PropsWithChildren<{ value: string }>) => {
  const { value: selectedValue } = useTabsContext();

  const isSelected = selectedValue === value;

  return <div data-value={value}>{isSelected ? children : null}</div>;
};
