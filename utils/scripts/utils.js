// Returns a specific variable from the cli arguments
// node utils/scripts/deleteAllEntries.js target=recipes => "recipes"
function getCliArgumentValue(argName, args = process.argv) {
  const prefix = `${argName}=`;
  const foundArg = args.find((arg) => arg.startsWith(prefix));
  return foundArg ? foundArg.replace(prefix, "") : "";
}

export { getCliArgumentValue };
