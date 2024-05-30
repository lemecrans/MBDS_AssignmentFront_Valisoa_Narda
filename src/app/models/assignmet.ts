export interface Assignment {
    _id: number;
    dateDeRendu: Date;
    titre: string;
    rendu: boolean;
    matiere: {
        titre: string;
        prof: {
            nom: String,
            photo: String,
            email: String
        }
    };
    note: number;
    remarques: string;
}
export interface Affichage_Assignment {
    _id: number;
    dateDeRendu: Date;
    titre: string;
    note: number;
    remarques: string;
    nom_etu: string;
    id_etu: string;
}

export class AffichageAssignment implements Affichage_Assignment {
    constructor(
        public _id: number,
        public dateDeRendu: Date,
        public titre: string,
        public note: number,
        public remarques: string,
        public nom_etu: string,
        public id_etu: string
    ) {}
}