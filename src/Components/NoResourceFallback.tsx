import React from 'react';
import styled from 'styled-components';

const noResourceHeader = (resource: string) => `There are no ${resource}s yet`;
const noResourceBody = (resource: string) =>
  `Start typing and press Ctrl+Enter to create a new ${resource}.`;

const notFoundHeader = (resource: string) => `No matching ${resource}s`;
const notFoundBody = (resource: string) =>
  `Try a different keyword or press Ctrl+Enter to create a new ${resource}.`;

interface Props {
  hasSearchText: boolean;
  resourceName: string;
}

export default function NoResourceFallback({ hasSearchText, resourceName }: Props) {
  return (
    <>
      <FallbackHeader>
        {hasSearchText ? notFoundHeader(resourceName) : noResourceHeader(resourceName)}
      </FallbackHeader>
      <span>
        {hasSearchText ? notFoundBody(resourceName) : noResourceBody(resourceName)}
      </span>
    </>
  );
}

const FallbackHeader = styled.span`
  display: block;
  font-weight: 600;
  margin-bottom: 10px;
`;
