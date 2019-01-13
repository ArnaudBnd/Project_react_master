import React from 'react'
import classnames from 'classnames'
import '../login/index.css'

const CSSError:any = {
  color: 'red'
}

const TextFieldGroup = ({
  field,
  value,
  label,
  error,
  type,
  onChange,
  checkUserExists
}) => (
  <div className={classnames('form-group', { 'has-error': error })}>
    <h3 className="control-label">{label}</h3>
    <input
      onChange={onChange}
      onBlur={checkUserExists}
      value={value}
      type={type}
      name={field}
      className="form-control"
    />
    {error && <span style={CSSError}>{error}</span>}
  </div>
)

export default TextFieldGroup
