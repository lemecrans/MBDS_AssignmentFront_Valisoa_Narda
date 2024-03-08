/*export class Assignment {
  _id?: string;
  nom!: string;
  dateDeRendu!: Date;
  rendu!: boolean;
}*/
export class Assignment {
  _id?: number;
  dateDeRendu!: Date;
  titre!: string;
  rendu!: boolean;
  auteur!: {
      nom: string;
      photo: string; // chemin du répertoire de stockage
      email: string;
  };
  matiere!: {
      titre: string;
      prof: {
          nom: string;
          photo: string; // chemin du répertoire de stockage
          email: string;
      };
  };
  note!: number;
  remarques!: string;
}
  /*constructor(
      id: number,
      dateDeRendu: Date,
      titre: string,
      rendu: boolean,
      auteur: { nom: string; photo: string; email: string },
      matiere: { titre: string; prof: { nom: string; photo: string; email: string } },
      note: number,
      remarques: string
  ) {
      this._id = id;
      this.dateDeRendu = dateDeRendu;
      this.titre = titre;
      this.rendu = rendu;
      this.auteur = auteur;
      this.matiere = matiere;
      this.note = note;
      this.remarques = remarques;
  }*/


