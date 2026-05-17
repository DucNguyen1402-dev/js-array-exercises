/**
 * Creates a connection handler for binding modules to controller APIs.
 *
 * This factory encapsulates binding logic between domain modules
 * (UI, SERVICE, RENDER) and controller interfaces.
 *
 * It ensures a clean separation between:
 * - composition layer (bootstrap)
 * - execution layer (controller)
 *
 * @param {Object} controller - The application controller exposing connect APIs
 * @param {Function} controller.connectUI - Injects UI dependencies into controller
 * @param {Function} controller.connectServices - Injects service dependencies
 * @param {Function} controller.connectRenders - Injects render dependencies
 *
 * @returns {Function} handleConnection
 * A function used to register bindings into the controller.
 *
 * @example
 * const handleConnection = createHandleConnection(controller);
 *
 * handleConnection([
 *   ['swap', swapUI],
 *   ['warnings', warningUI],
 * ], 'UI');
 */
export const BINDING_TYPES = Object.freeze({
  UI: 'UI',
  SERVICE: 'SERVICE',
  RENDER: 'RENDER',
});

export const createHandleConnection = ({
  registerUI,
  registerServices,
  registerRenders,
}) => {
  const BINDING_API = {
    UI: registerUI,
    SERVICE: registerServices,
    RENDER: registerRenders,
  };

  /**
   * Connects a list of bindings to a specific controller domain.
   *
   * @param {Array<[string, any]>} bindings - List of [namespace, dependencies]
   * @param {('UI'|'SERVICE'|'RENDER')} type - Target binding category
   *
   * @throws {Error} If the provided type is not supported
   */
  return (bindings, type) => {
    const fn = BINDING_API[type];

    if (!fn) throw new Error(`Unknown type: ${type}`);

    bindings.forEach(([ns, deps]) => fn(ns, deps));
  };
};

