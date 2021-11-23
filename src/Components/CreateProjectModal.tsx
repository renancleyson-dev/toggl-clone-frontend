import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { ErrorMessage, Formik, useField } from 'formik';
import Modal from 'react-modal';
import { projectColors } from '../helpers/constants';
import useOutsideonCreateProject from '../hooks/useOutsideCallback';
import { IProject } from '../types/projects';
import randomArrayValue from 'src/helpers/randomValue';
import { createProject } from 'src/resources/projects';
import { InputStyles, colors, buttonResets } from '../styles';
import TextInput from './TextInput';

if (Modal.defaultStyles.overlay) {
  Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.6)';
}

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

const customModalStyles = {
  overlay: {
    zIndex: 101,
  },
  content: {
    width: '360px',
    height: '180px',
    margin: 'auto',
    paddingTop: '15px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    fontSize: '14px',
  },
};

const FormWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
  align-items: center;
`;

const ModalTitle = styled.span`
  display: block;
  margin-bottom: 15px;
`;

const Input = styled(TextInput).withConfig({
  // @ts-ignore
  shouldForwardProp: (prop) => prop !== 'hasError',
})`
  ${InputStyles}
  border-color: ${({ hasError }: { hasError: boolean }) =>
    hasError ? '#ff0000' : '#000'};
  border-radius: 8px;
  flex: 0 0 89%;
  padding-left: 15px;
  height: 35px;
`;

const ColorPickerWrapper = styled.div`
  position: absolute;
  right: 20px;
  padding: 15px;
  width: 200px;
  background-color: #fff;
  box-shadow: 0px 0px 4px 1px #ddd;
  border-radius: 8px;
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
`;

const ColorCircle = styled.div`
  position: relative;
  margin-left: 10px;
  min-width: 24px;
  min-height: 24px;
  border-radius: 50%;
  font-size: 10px;
  color: #fff;
  background-color: ${({ color }: { color: string }) => color};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const ErrorMessageWrapper = styled.div`
  padding-left: 5px;
  font-size: 10px;
  color: #ff0000;
`;

const CreateButton = styled.button`
  ${buttonResets}
  min-width: 100%;
  margin-top: 30px;
  padding: 7px 0;
  text-align: center;
  border-radius: 8px;
  background-color: ${colors.primary};
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: ${colors.darkPrimary};
  }
`;

interface ColorChoiceProps {
  selected?: boolean;
  color: string;
  onClick: () => any;
}

const ColorChoice = ({ selected, color, ...props }: ColorChoiceProps) => {
  if (selected) {
    return (
      <ColorCircle color={color} {...props}>
        <FaCheck />
      </ColorCircle>
    );
  }
  return <ColorCircle color={color} {...props} />;
};

const ColorPicker = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [field, , helpers] = useField('color');
  const pickerRef = useRef(null);
  const colorChoices = projectColors.map((color: string) => (
    <ColorChoice
      selected={field.value === color}
      color={color}
      key={color}
      onClick={() => {
        helpers.setValue(color);
        setShowPicker(false);
      }}
    />
  ));
  useOutsideonCreateProject(pickerRef, () => setShowPicker(false));

  if (showPicker) {
    return <ColorPickerWrapper ref={pickerRef}>{colorChoices}</ColorPickerWrapper>;
  }

  return (
    <div ref={pickerRef} onClick={() => setShowPicker(true)}>
      <ColorCircle color={field.value} />
    </div>
  );
};

interface IForm {
  name: string;
  color: string;
}

interface IErrors {
  name?: string;
}

const initialValues = {
  name: '',
  color: randomArrayValue(projectColors),
};

const validate = (fields: { name: string; color: string }) => {
  const errors: IErrors = {};

  if (!fields.name) {
    errors.name = 'Please enter a project name';
  }

  return errors;
};

interface CreateProjectModalProps extends Modal.Props {
  closeModal: () => void;
  initialName?: string;
  onCreateProject?: (project: IProject) => any;
}

export default function CreateProjectModal({
  closeModal,
  onCreateProject,
  initialName,
  ...props
}: CreateProjectModalProps) {
  const handleSubmit = (
    field: IForm,
    { setSubmitting }: { setSubmitting: (boolState: boolean) => void }
  ) => {
    createProject(field).then((response) => {
      if (onCreateProject) {
        onCreateProject(response.data);
      }
      closeModal();
      setSubmitting(false);
    });
  };

  const initialValuesWithProps = { ...initialValues, name: initialName || '' };

  return (
    <Modal style={customModalStyles} onRequestClose={closeModal} {...props}>
      <ModalTitle>Create new project</ModalTitle>
      <Formik
        initialValues={initialValuesWithProps}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting, errors }) => (
          <FormWrapper>
            <Input
              name="name"
              placeholder="Project name"
              hasError={!!errors.name}
              autoFocus
            />
            <ColorPicker />
            <ErrorMessageWrapper>
              <ErrorMessage name="name" />
            </ErrorMessageWrapper>
            <CreateButton disabled={isSubmitting} onClick={() => handleSubmit()}>
              Create project
            </CreateButton>
          </FormWrapper>
        )}
      </Formik>
    </Modal>
  );
}
