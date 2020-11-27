const RDF = require('rdflib')

const validationReport = `
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix ex: <http://example.org/ns#> .

ex:MyShape
	a sh:NodeShape ;
	sh:targetNode ex:MyInstance ;
	sh:property [    # _:b1
		# Violations of sh:minCount and sh:datatype are produced as warnings
		sh:path ex:myProperty ;
		sh:minCount 1 ;
		sh:datatype xsd:string ;
		sh:severity sh:Warning ;
	] ;
	sh:property [    # _:b2
		# The default severity here is sh:Violation
		sh:path ex:myProperty ;
		sh:maxLength 10 ;
		sh:message "Too many characters"@en ;
		sh:message "Zu viele Zeichen"@de ;
	] .


[	a sh:ValidationReport ;
	sh:conforms false ;
	sh:result
	[	a sh:ValidationResult ;
		sh:resultSeverity sh:Warning ;
		sh:focusNode ex:MyInstance ;
		sh:resultPath ex:myProperty ;
		sh:value "http://toomanycharacters"^^xsd:anyURI ;
		sh:sourceConstraintComponent sh:DatatypeConstraintComponent ;
		sh:sourceShape _:b1 ;
	] ,
	[	a sh:ValidationResult ;
		sh:resultSeverity sh:Violation ;
		sh:focusNode ex:MyInstance ;
		sh:resultPath ex:myProperty ;
		sh:value "http://toomanycharacters"^^xsd:anyURI ;
		sh:resultMessage "Too many characters"@en ;
		sh:resultMessage "Zu viele Zeichen"@de ;
		sh:sourceConstraintComponent sh:MaxLengthConstraintComponent ;
		sh:sourceShape _:b2 ;
	]
] .
`;

// const rdf = RDF.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#")
const sh = RDF.Namespace("http://www.w3.org/ns/shacl#")

const store = RDF.graph()

try {
  RDF.parse(validationReport, store, 'http://localhost', 'text/turtle')
} catch (err) {
  console.log(err)
}

const mapToValidationResult = node => {
  const severity = store.anyStatementMatching(node, sh('resultSeverity')).object.id()
  const focusNode = store.anyStatementMatching(node, sh('focusNode')).object.uri
  const resultPath = store.anyStatementMatching(node, sh('resultPath')).object.uri
  const value = store.anyStatementMatching(node, sh('value')).object.toString()
  const sourceShape = store.anyStatementMatching(node, sh('sourceShape')).object.uri
  const detail = store.anyStatementMatching(node, sh('detail'))?.object.uri
  const resultMessage = store
    .statementsMatching(node, sh('resultMessage'))
    .reduce((previous, { object }) => ({ ...previous, [object.lang]: object.value }), {})

  return {
    severity,
    focusNode,
    resultPath,
    value,
    sourceShape,
    detail,
    resultMessage
  };
}

const conforms = !!store.any(null, sh('conforms'), true);

const tips = store
  .each(null, null, sh('ValidationResult'))
  .filter(node => store.anyStatementMatching(node, sh('resultSeverity'), sh('Info')))
  .map(mapToValidationResult)
const warnings = store
  .each(null, null, sh('ValidationResult'))
  .filter(node => store.anyStatementMatching(node, sh('resultSeverity'), sh('Warning')))
  .map(mapToValidationResult)
const violations = store
  .each(null, null, sh('ValidationResult'))
  .filter(node => store.anyStatementMatching(node, sh('resultSeverity'), sh('Violation')))
  .map(mapToValidationResult)

// console.dir({ tips }, { depth: null });
// console.dir({ statements: store.anyStatementMatching(warnings[0]) }, { depth: null });

console.dir({
  conforms,
  tips,
  warnings,
  violations
}, { depth: null });