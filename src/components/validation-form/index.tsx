import React, {
  memo,
  FC,
  useState,
  FormEventHandler,
  useEffect,
  ChangeEventHandler
} from 'react';

import { compose } from 'redux';

import { ExpansionPanelBody, ExpansionPanelHead } from '../expansion-panel';
import GraphFieldset from '../graph-fieldset';
import Translation from '../translation';

import SC from './styled';

import type { ValidationRequest } from '../../types';
import { InputType } from '../../types/enums';
import Checkbox, { LabelPosition } from '../checkbox';
import withValidator, { Props as ValidatorProps } from '../with-validator';

interface ExternalProps {
  dataGraph?: File | string;
  shapesGraph?: File | string;
  ontologyGraph?: File | string;
  expand: boolean;
  includeExpandedTriples: boolean;
  isLoading: boolean;
  onValidate: (request: ValidationRequest) => void;
}

interface Props extends ExternalProps, ValidatorProps {}

const ValidationForm: FC<Props> = ({
  dataGraph,
  shapesGraph,
  ontologyGraph,
  expand,
  includeExpandedTriples,
  shapesCollection,
  ontologyCollection,
  validatorActions: { fetchShapesCollectionRequested: fetchShapesCollection },
  isLoading,
  onValidate,
  ...props
}) => {
  const shapesOptions = shapesCollection
    ? shapesCollection.shapes.map(shapesDef => ({
        value: shapesDef.url,
        label: `${shapesDef.specificationName} ${shapesDef.specificationVersion}`
      }))
    : [];

  const ontologyOptions = ontologyCollection
    ? ontologyCollection.ontologies.map(ontologyDef => ({
        value: ontologyDef.url,
        label: `${ontologyDef.name}`
      }))
    : [];

  const getShapesOption = (shapesUrl: string) =>
    shapesCollection?.shapes.find(({ url }) => url === shapesUrl);

  const [inputDataGraph, setInputDataGraph] = useState<File | string | null>(
    dataGraph ?? ''
  );
  const [inputShapesGraph, setInputShapesGraph] = useState<
    File | string | null
  >(shapesGraph ?? '');
  const [inputOntologyGraph, setInputOntologyGraph] = useState<
    File | string | null
  >(ontologyGraph ?? '');
  const [inputConfigExpand, setInputConfigExpand] = useState(expand);
  const [
    inputConfigIncludeExpandedTriples,
    setInputConfigIncludeExpandedTriples
  ] = useState(includeExpandedTriples);

  const validateInput = () => {
    if (inputDataGraph && inputShapesGraph) {
      onValidate({
        dataGraph: inputDataGraph,
        shapesGraph: inputShapesGraph,
        ontologyGraph: inputOntologyGraph ?? '',
        config: {
          expand: inputConfigExpand,
          includeExpandedTriples: inputConfigIncludeExpandedTriples
        }
      });
    }
  };

  const handleSubmitForm: FormEventHandler = e => {
    e.preventDefault();
    validateInput();
  };

  const handleOnChangeDataGraph = (
    inputType: InputType,
    graph: File | string | null
  ) => {
    if (inputType) {
      setInputDataGraph(graph);
    }
  };

  const handleOnChangeShapesGraph = (
    inputType: InputType,
    graph: File | string | null
  ) => {
    if (inputType) {
      setInputShapesGraph(graph);
    }
  };

  const handleOnChangeOntologyGraph = (
    inputType: InputType,
    graph: File | string | null
  ) => {
    if (inputType) {
      setInputOntologyGraph(graph);
    }
  };

  const shapesGraphTitle = () => {
    const prefix = 'Regelsett';

    if (!inputShapesGraph) {
      return prefix;
    }

    if (typeof inputShapesGraph === 'string') {
      const shapesOption = getShapesOption(inputShapesGraph);
      if (shapesOption) {
        return `${prefix} (${shapesOption.specificationName} ${shapesOption.specificationVersion})`;
      }
    }

    return `${prefix} (tilpasset)`;
  };

  const ontologyGraphTitle = () => {
    const prefix = 'Ontologi';

    if (!inputOntologyGraph) {
      return prefix;
    }

    if (typeof inputOntologyGraph === 'string') {
      const ontologyOption = getShapesOption(inputOntologyGraph);
      if (ontologyOption) {
        return `${prefix} (${ontologyOption.name})`;
      }
    }

    return `${prefix} (tilpasset)`;
  };

  const handleOnChangExpand: ChangeEventHandler<HTMLInputElement> = e => {
    setInputConfigExpand(e.target.checked);
  };

  const handleOnChangeIncludeExpandedTriples: ChangeEventHandler<HTMLInputElement> = e => {
    setInputConfigIncludeExpandedTriples(e.target.checked);
  };

  useEffect(() => {
    fetchShapesCollection();
  }, []);

  useEffect(() => {
    if (!inputShapesGraph) {
      const dcatv2 = shapesCollection?.shapes.find(
        ({ specificationName, specificationVersion }) =>
          specificationName === 'DCAT-AP-NO' && specificationVersion === '2.0'
      )?.url;

      if (dcatv2) {
        setInputShapesGraph(dcatv2);
      }
    }
  }, [shapesCollection]);

  return (
    <SC.ValidationInputForm {...props} onSubmit={handleSubmitForm}>
      <GraphFieldset
        graph={inputDataGraph}
        fields={[
          {
            name: 'dataGraphFile',
            inputType: InputType.FILE,
            title: 'Valider fil',
            checked: !inputDataGraph
          },
          {
            name: 'dataGraphUrl',
            inputType: InputType.URL,
            title: 'Valider lenke',
            placeholder: 'Eks. https://mitt.domene.no/eksempel.ttl',
            checked: !!inputDataGraph
          },
          {
            name: 'dataGraphText',
            inputType: InputType.TEXT,
            title: 'Valider tekst',
            placeholder: 'Lim inn tekst her'
          }
        ]}
        isLoading={isLoading}
        isStandalone
        onChange={handleOnChangeDataGraph}
      />
      <SC.ExpansionPanel>
        <ExpansionPanelHead>{shapesGraphTitle()}</ExpansionPanelHead>
        <ExpansionPanelBody>
          <GraphFieldset
            graph={inputShapesGraph}
            fields={[
              {
                name: 'shapesGraphSelect',
                inputType: InputType.SELECT,
                title: 'Velg regelsett',
                options: shapesOptions,
                checked: true
              },
              {
                name: 'shapesGraphFile',
                inputType: InputType.FILE,
                title: 'Regelsett fil'
              },
              {
                name: 'shapesGraphUrl',
                inputType: InputType.URL,
                title: 'Regelsett lenke',
                placeholder: 'Eks. https://mitt.domene.no/eksempel.ttl'
              },
              {
                name: 'shapesGraphText',
                inputType: InputType.TEXT,
                title: 'Regelsett tekst',
                placeholder: 'Lim inn tekst her'
              }
            ]}
            isLoading={isLoading}
            onChange={handleOnChangeShapesGraph}
          />
        </ExpansionPanelBody>
      </SC.ExpansionPanel>
      <SC.ExpansionPanel>
        <ExpansionPanelHead>{ontologyGraphTitle()}</ExpansionPanelHead>
        <ExpansionPanelBody>
          <GraphFieldset
            graph={inputOntologyGraph}
            fields={[
              {
                name: 'ontologyGraphSelect',
                inputType: InputType.SELECT,
                title: 'Velg ontologi',
                options: ontologyOptions,
                checked: true
              },
              {
                name: 'ontologyGraphFile',
                inputType: InputType.FILE,
                title: 'Ontologi fil'
              },
              {
                name: 'ontologyGraphUrl',
                inputType: InputType.URL,
                title: 'Ontologi lenke',
                placeholder: 'Eks. https://mitt.domene.no/eksempel.ttl'
              },
              {
                name: 'ontologyGraphText',
                inputType: InputType.TEXT,
                title: 'Ontologi tekst',
                placeholder: 'Lim inn tekst her'
              }
            ]}
            isLoading={isLoading}
            onChange={handleOnChangeOntologyGraph}
          />
        </ExpansionPanelBody>
      </SC.ExpansionPanel>
      <SC.ExpansionPanel>
        <ExpansionPanelHead>Innstillinger</ExpansionPanelHead>
        <ExpansionPanelBody>
          <Checkbox
            checked={inputConfigExpand}
            labelPosition={LabelPosition.RIGHT}
            onChange={handleOnChangExpand}
          >
            <SC.CheckboxLabel>
              <span>Ekspander grafen</span>
              <span>
                Om tjenesten skal validere eksterne tripler som refereres til.
              </span>
            </SC.CheckboxLabel>
          </Checkbox>
          <Checkbox
            checked={inputConfigIncludeExpandedTriples}
            labelPosition={LabelPosition.RIGHT}
            onChange={handleOnChangeIncludeExpandedTriples}
          >
            <SC.CheckboxLabel>
              <span>Inkluderer eksterne tripler i svaret</span>
              <span>
                Om tjenesten skal returnere eksterne tripler som refereres til.
              </span>
            </SC.CheckboxLabel>
          </Checkbox>
        </ExpansionPanelBody>
      </SC.ExpansionPanel>
      <SC.Button
        onClick={validateInput}
        disabled={isLoading || !inputDataGraph || !inputShapesGraph}
      >
        {isLoading ? <SC.Spinner /> : <Translation id='Valider' />}
      </SC.Button>
    </SC.ValidationInputForm>
  );
};
export default compose<FC<ExternalProps>>(memo, withValidator)(ValidationForm);
