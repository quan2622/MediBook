import db from "../models"

const createNewSpecialty = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!payload.nameSpecialty || !payload.imageSpecialty || !payload.descriptionHTML || !payload.descriptionMarkdown) {
        return resolve({ EC: 1, EM: "Missing required params" })
      } else {
        const res = await db.Specialty.create({
          name: payload.nameSpecialty,
          image: payload.imageSpecialty,
          descriptionHTML: payload.descriptionHTML,
          descriptionMarkdown: payload.descriptionMarkdown,
        });

        if (!res) {
          return resolve({ EC: 2, EM: "Cannot create new specialty!" });
        }
        resolve({ EC: 0, EM: "Create new specialty success" })
      }
    } catch (error) {
      reject(error)
    }
  })
}


export default {
  createNewSpecialty,
}