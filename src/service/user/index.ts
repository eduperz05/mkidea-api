
// Los parametros no se ajustan al modelo
// No hay parametros
// El usuario ya existe

export const createUser = async(userToCreate: any, modelCreator: any) => {
  if (!userToCreate || !modelCreator) {
    throw new Error("No parameters");
  }
  if (!userToCreate.email || userToCreate.email.charAt(0) === "a") {
    throw new Error("User email is not valid.");
  }
  const user = await modelCreator(userToCreate);
  return user;
};