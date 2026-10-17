/* eslint-disable camelcase */
export const shorthands = undefined;

export const up = (pgm) => {
  // 1. Membuat tabel collaborations
  pgm.createTable('collaborations', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    note_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  // 2. Constraint UNIQUE pada kombinasi note_id dan user_id
  pgm.addConstraint(
    'collaborations',
    'unique_collaboration',
    'UNIQUE(note_id, user_id)',
  );

  // 3. Foreign Key note_id merujuk ke notes(id)
  pgm.addConstraint(
    'collaborations',
    'fk_collaborations.note_id_notes.id',
    'FOREIGN KEY(note_id) REFERENCES notes(id) ON DELETE CASCADE',
  );

  // 4. Foreign Key user_id merujuk ke users(id)
  pgm.addConstraint(
    'collaborations',
    'fk_collaborations.user_id_users.id',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE',
  );
};

export const down = (pgm) => {
  // Menghapus tabel collaborations
  pgm.dropTable('collaborations');
};