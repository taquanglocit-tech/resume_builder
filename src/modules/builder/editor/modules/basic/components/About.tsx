/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment } from 'react';
import { RichtextEditor } from '@/helpers/common/components/richtext';

const About = ({
  basicTabs,
  onChangeHandler,
}: {
  basicTabs: any;
  onChangeHandler: (value: any, key: string) => void;
}) => {
  return (
    <Fragment>
      <RichtextEditor
        label="Về tôi"
        value={basicTabs.summary}
        onChange={(htmlOutput) => {
          onChangeHandler(htmlOutput, 'summary');
        }}
        name="summary"
      />
      <RichtextEditor
        label="Mục tiêu nghề nghiệp"
        value={basicTabs.objective}
        onChange={(htmlOutput) => {
          onChangeHandler(htmlOutput, 'objective');
        }}
        name="objective"
      />
    </Fragment>
  );
};

export default About;
