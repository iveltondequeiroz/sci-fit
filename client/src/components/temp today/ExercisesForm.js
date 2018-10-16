import React from 'react'
import { Field, reduxForm } from 'redux-form'

const ExercisesForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Favorite Color</label>
        <div>
          <Field name="favoriteColor" component="select">
            <option></option>
            <option value="ff0000">Red</option>
            <option value="00ff00">Green</option>
            <option value="0000ff">Blue</option>
          </Field>
        </div>
      </div>
      <div>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Add</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'exerciseform'  // a unique identifier for this form
})(ExercisesForm)