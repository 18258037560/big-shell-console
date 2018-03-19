import React from 'react'
import classnames from 'classnames'

interface SelectTagsDialogProps {
  options: { value: string, text: string }[]
  values: { value: string, text: string }[]
  onChange: (item, selectedIndex) => void
  useSelect?: boolean
  selectWidth?: string
}

class SelectTagsDialog extends React.Component<SelectTagsDialogProps> {
  static defaultProps = {
    useSelect: false
  }

  render() {
    const {options} = this.props
    return (
      <ul className="filter-items">
        <li className={classnames('filter-item', {'selected': this.props.values.length == 0})}
            onClick={() => this.props.onChange(0, 1000)}
        >
          不限
        </li>

        {
          !this.props.useSelect && options.map((item) => {
            let selectedIndex = this.props.values.indexOf(item);
            return (
              <li key={item.value}
                  className={classnames('filter-item', {'selected': selectedIndex != -1})}
                  onClick={() => this.props.onChange(item, selectedIndex)}
              >
                {item.text}
              </li>
            )
          })
        }
      </ul>
    )
  }
}

export default SelectTagsDialog
