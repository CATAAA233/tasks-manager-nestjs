export class TaskEntity {
  constructor(
    public title: String,
    public description: String,
    public status: string,
    public deadline: string,
    public created_by: string,
    public comments?: string,
    public tags?: string,
    public file?: string,
    ) {}
}

// 1. Título (Obligatorio)
// 2. Descripción (Obligatorio)
// 3. Estatus de compleción (Obligatorio)
// 4. Fecha de entrega (Obligatorio)
// 5. Comentarios (Opcional)
// 6. Creado por (Obligatorio)
// 7. Tags (Opcional)
// 8. Archivo (Opcional, no mayor a 5MB y sólo formatos .PDF; .PNG y .JPG)
