

export default {
    title: 'Component/Badge',
    argTypes: {
      type: {
        options: ["warning", "error" , "info", "success"],
        control: { type: 'select' }, // Automatically inferred when 'options' is defined
        description: "Tipo de badge"
      },
      rounded: {
        type: 'boolean',
        description: 'Indica si se muestra con border-radius',
        defaultValue: { summary: false },
      },
      ghost: {
        type: 'boolean', 
        description: 'Indica si requiere color de background',
        defaultValue: { summary: false },
      },
    },
  };
  const defaultArgs = {
    ghost: false,
    type: 'warning',
    rounded: true
  };
  const Template = args => {
    return <blaze-badge {...args}>Info</blaze-badge>;
  };

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
