import { Idea } from "../models/HiveMindDB.js";

export class IdeaController {
  /**
   * Metodo che restituisce tutte le idee presenti nel database se non
   * viene passato il parametro userId. Se userId è presente, restituisce
   * solo le idee dell'utente corrispondente.
   */
  static async getAllIdeas(params) {
    return Idea.findAll(params?.userId ? { where: { user_id: params.userId } } : {});
  }

  static async saveIdea(req) {
    let idea = Idea.build(req.body);
    idea.user_id = req.userId; // imposto l'id dell'utente loggato come proprietario dell'idea
    return idea.save();
  }

  static async findById(req) {
    return Idea.findByPk(req.params.id);
  }

  static async delete(req) {
    return new Promise((resolve, reject) => {
      this.findById(req).then((item) => {
        item.destroy().then(() => {
          resolve(item);
        });
      });
    });
  }

  static async update(id, updatedIdea) {
    let idea = await Idea.findByPk(id);
    idea.set(updatedIdea);
    return idea.save();
  }
}
