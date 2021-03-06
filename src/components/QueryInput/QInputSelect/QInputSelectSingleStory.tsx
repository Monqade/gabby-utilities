/**
 * Storybook seemed to have troubles with initialization.
 * The component is used only for storybook.
 */

import { ReactElement, useState } from 'react';

import { QInputSelectSingle } from './QInputSelectSingle';
import { SelectOption } from '../../GenericInput';
import { Grid } from '@material-ui/core';
import { TermOperators } from '../term.types';

interface QInputSelectSingleProps {
  allowEmpty?: boolean;

  formatCallbackValues?: (value: any) => object;
  formatDisplayValues?: (value: any) => string;
  inputProps?: object;
  label?: string;
  termOperator?: TermOperators;
  initialValue?: string | number; // actually its one of the data-types?
  options: SelectOption[];
}
const Code = (props: any) => {
  return (
    <code>
      <pre>{props.children}</pre>
    </code>
  );
};

export const QInputSelectSingleStory = ({
  allowEmpty = false,
  inputProps,
  label,
  initialValue = '',
  options,
  formatDisplayValues = (value: any) => {
    return `is ${value}`;
  },
  formatCallbackValues,
  termOperator,
}: QInputSelectSingleProps) => {
  const [callStack, setCallStack] = useState([] as any[]);

  const handleChange = (...args: any) => {
    setCallStack(callStack.concat([args]));
  };

  return (
    <Grid container spacing={3} direction="row">
      <Grid item>
        <QInputSelectSingle
          allowEmpty={allowEmpty}
          inputProps={inputProps}
          label={label}
          initialValue={initialValue}
          onChange={handleChange}
          termOperator={termOperator}
          options={options}
        />
        <ul>
          {callStack.map((call, idx) => (
            <li key={idx}>{JSON.stringify(call)}</li>
          ))}
        </ul>
      </Grid>
      <Grid item>
        <article>
          <h2>Properties</h2>
          <p>
            <ul>
              <li>
                <Code>allowEmpty?: boolean;</Code>
                <figure>
                  <figcaption>
                    Traditional Dropdown box behavior. Effectively unselect. Will cause
                    value of QInput to be null.
                  </figcaption>
                </figure>
              </li>
              <li>
                <Code>formatCallbackValues?: (value: any) =&gt; object;</Code>
                <figure>
                  <figcaption>
                    Determine the shape of `termValue`.
                    <br />
                    Default: <Code>(value) =&gt; &#123;$eq:value&#125;</Code>
                  </figcaption>
                </figure>
              </li>
              <li>
                <Code>formatDisplayValues?: (value: any) =&gt; string;</Code>
                <figure>
                  <figcaption>
                    Human readable label. The label part of &#123;value: label&#125;
                    <br />
                    Default: <Code>(value) =&gt; value</Code>
                  </figcaption>
                </figure>
              </li>
              <li>
                <Code>inputProps?: object;</Code>
                <figure>
                  <figcaption>Added to the html control</figcaption>
                </figure>
              </li>
              <li>
                <Code>label?: string;</Code>
                <figure>
                  <figcaption>The Label</figcaption>
                </figure>
              </li>
              <li>
                <Code>termOperator?: TermOperators;</Code>
                <figure>
                  <figcaption>
                    The operator to use for the callback termValue. Default '$eq' see
                    formatCallbackValues for example.
                  </figcaption>
                </figure>
              </li>
              <li>
                <Code>initialValue?: string | number;</Code>
                <figure>
                  <figcaption>
                    Sets the control's starting value. no validity check is performed.
                    It is the responsibility of the developer to assure the value is one
                    of the option values.
                  </figcaption>
                </figure>
              </li>
              <li>
                <Code>options: SelectOption[];</Code>
                <figure>
                  <figcaption>The options of the dropdown box.</figcaption>
                </figure>
                <Code>
                  SelectOption: &#123; value: string|number, label: string &#125;
                </Code>
              </li>
            </ul>
          </p>
        </article>
      </Grid>
    </Grid>
  );
};
