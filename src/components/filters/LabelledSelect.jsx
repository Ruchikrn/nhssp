import React, { Component } from 'react'
import Select, {components} from 'react-select'
import CreatableSelect from 'react-select/lib/Creatable';


// Fix for issue: https://github.com/JedWatson/react-select/issues/3128
// react-select is slow when rendering large number of options
const Option = ({ children, ...props }) => {
    const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
    const newProps = Object.assign(props, { innerProps: rest });
    return (
      <components.Option
        {...newProps}
      >
        {children}
      </components.Option>
    );
  };
  

class LabelledSelect extends Component {

    componentDidMount() {
        this.props.refreshOptions && this.props.refreshOptions();
    }

    render() {
        var { label, className, onChange, creatable, ...rest } = this.props
        const SelectComponent = creatable ? CreatableSelect : Select;
        return (
            <div className={className}>
                <label>
                    {label}
                </label>
                <SelectComponent
                    placeholder="" 
                    isLoading={this.props.loading}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    components={{Option}}
                    // Even if this is not isMulti, we, anyway, store values as an array
                    onChange={(values) => 
                      Array.isArray(values) ? 
                        this.props.onChange(values) :
                          values === null ? 
                            this.props.onChange([]): 
                            this.props.onChange([values])
                    }
                    isDisabled={this.props.options ? this.props.options.length === 0 : true}
                    onCreateOption={this.props.onCreateOption}
                    getNewOptionData={(inputValue, optionLabel) => ({
                      name: optionLabel, id: null
                    })}
                    isValidNewOption={(
                      inputValue,
                      selectValue,
                      selectOptions
                    ) => {
                      return !(
                        !inputValue ||
                        selectValue.some(option => inputValue === option.name) ||
                        selectOptions.some(option => inputValue === option.name)
                      )}
                    }
                      
                    {...rest}
                    />
            </div>

        );
    }
}

export default LabelledSelect;