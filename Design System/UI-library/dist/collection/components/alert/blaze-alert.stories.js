

export default {
    title: 'Component/Alert',
    argTypes: {
      type: {
        options: ["warning", "error" , "info", "success"],
        control: { type: 'select' }, // Automatically inferred when 'options' is defined
        description: "Tipo de alerta"
      },
      dismissible: {
        type: 'boolean',
        description: 'Indica si ese muestra la opcion de cerrar',
        defaultValue: { summary: false },
      },
      open: {
        type: 'boolean', 
        description: 'Indica si se muestra el alert',
        defaultValue: { summary: false },
      },
    },
  };
  const defaultArgs = {
    dismissible: false,
    type: 'warning',
    open: true
  };
  const Template = args => {
    return <blaze-alert {...args}>Info</blaze-alert>;
  };

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
