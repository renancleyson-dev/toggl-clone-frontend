import React, { useRef, useState } from 'react';
import axios from 'axios';
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
import { useProjectsConsumer } from 'src/hooks/useProjects';

interface CreateProjectModalProps extends Modal.Props {
  closeModal: () => void;
  initialName?: string;
  onCreateProject?: (project: IProject) => any;
}

interface IForm {
  name: string;
  color: string;
}

interface IErrors {
  name?: string;
}

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
    width: '320px',
    height: '185px',
    margin: 'auto',
    paddingTop: '15px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    fontSize: '14px',
  },
};

const validate = (fields: { name: string; color: string }) => {
  const errors: IErrors = {};

  if (!fields.name) {
    errors.name = 'Please enter a project name';
  }

  return errors;
};

const ColorPicker = () => {
  const pickerRef = useRef(null);
  const [showPicker, setShowPicker] = useState(false);
  const [field, , helpers] = useField('color');

  const openPicker = () => setShowPicker(true);
  const closePicker = () => setShowPicker(false);

  useOutsideonCreateProject(pickerRef, closePicker);

  const colorChoices = projectColors.map((color: string) => {
    const isSelected = field.value === color;

    const handleClick = () => {
      helpers.setValue(color);
      setShowPicker(false);
    };

    if (isSelected) {
      return (
        <ColorCircle key={color} color={color} onClick={handleClick}>
          <FaCheck />
        </ColorCircle>
      );
    }
    return <ColorCircle key={color} color={color} onClick={handleClick} />;
  });

  if (showPicker) {
    return <ColorPickerWrapper ref={pickerRef}>{colorChoices}</ColorPickerWrapper>;
  }

  return (
    <div ref={pickerRef} onClick={openPicker}>
      <ColorCircle color={field.value} />
    </div>
  );
};

export default function CreateProjectModal({
  closeModal,
  onCreateProject,
  initialName,
  ...props
}: CreateProjectModalProps) {
  const { clearKey } = useProjectsConsumer();

  const initialValues = {
    name: initialName || '',
    color: randomArrayValue(projectColors),
  };

  const handleSubmit = async (
    field: IForm,
    {
      setSubmitting,
      setFieldError,
    }: {
      setFieldError: (field: string, errorMsg: string) => void;
      setSubmitting: (boolState: boolean) => void;
    }
  ) => {
    try {
      const { data } = await createProject(field);

      if (onCreateProject) {
        onCreateProject(data);
      }

      clearKey(data);
      closeModal();
      setSubmitting(false);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.data) {
        const messages: { [key: string]: string } = e.response.data;
        Object.entries(messages).forEach((value) => {
          const [field, fieldError] = value;
          setFieldError(field, `${field} ${fieldError}`);
        });
      }
    }
  };

  return (
    <Modal style={customModalStyles} onRequestClose={closeModal} {...props}>
      <ModalTitle>Create new project</ModalTitle>
      <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
        {({ handleSubmit, isSubmitting, errors }) => (
          <form onSubmit={handleSubmit}>
            <Field>
              <Input
                name="name"
                placeholder="Project name"
                hasError={!!errors.name}
                autoFocus
              />
              <ColorPicker />
            </Field>
            <ErrorMessageWrapper>
              <span>
                <ErrorMessage name="name" />
              </span>
            </ErrorMessageWrapper>
            <CreateButton disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create project'}
            </CreateButton>
          </form>
        )}
      </Formik>
    </Modal>
  );
}

const Field = styled.div`
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
  flex: 0 0 85%;
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
  height: 12px;
  padding-left: 5px;
  font-size: 10px;
  color: #ff0000;
`;

const CreateButton = styled.button`
  ${buttonResets}
  min-width: 100%;
  margin-top: 35px;
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
