export function selectId(props) {
  if (props.match && props.match.params) return props.match.params.id;
  return undefined;
}
