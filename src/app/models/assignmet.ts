export interface Assignment {
    id: number;
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