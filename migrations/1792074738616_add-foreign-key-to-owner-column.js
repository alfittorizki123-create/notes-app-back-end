/* eslint-disable camelcase */
export const shorthands = undefined;

export const up = (pgm) => {
  // 1. Membuat user dummy untuk menampung catatan lama tanpa pemilik
  pgm.sql("INSERT INTO users(id, username, password, fullname, created_at, updated_at) VALUES ('old_notes', 'old_notes', 'old_notes', 'old notes', NOW(), NOW())");

  // 2. Mengubah nilai owner pada catatan yang bernilai NULL menjadi 'old_notes'
  pgm.sql("UPDATE notes SET owner = 'old_notes' WHERE owner IS NULL");

  // 3. Memberikan constraint foreign key pada owner terhadap kolom id tabel users
  pgm.addConstraint('notes', 'fk_notes.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

export const down = (pgm) => {
  // 1. Menghapus constraint fk_notes.owner_users.id pada tabel notes
  pgm.dropConstraint('notes', 'fk_notes.owner_users.id');

  // 2. Mengembalikan nilai owner 'old_notes' menjadi NULL
  pgm.sql("UPDATE notes SET owner = NULL WHERE owner = 'old_notes'");

  // 3. Menghapus user dummy 'old_notes'
  pgm.sql("DELETE FROM users WHERE id = 'old_notes'");
};