import Note from '../models/note_model';


export const getNotes = () => {
  return Note.find({}).then((notes) => {
    return notes.reduce((result, item) => {
      result[item.id] = item;
      return result;
    }, {});
  });
};

export const deleteNote = (id) => {
  // to quote Prof. Cormen: left as an exercise to the reader
  // remember to return the mongoose function you use rather than just delete
  return Note.findByIdAndDelete(id).then((result) => {
    return result;
  }).catch((error) => {
    return error;
  });
};

export const createNote = (fields) => {
  // you know the drill. create a new Note mongoose object
  // return .save()
  const note = new Note();

  // All our fields are available in req.body, so let’s set them on the new Post object. You know how to do this.
  note.title = fields.title;
  note.x = fields.x;
  note.y = fields.y;
  note.content = fields.content;

  return note.save().then((result) => {
    return result;
  }).catch((error) => {
    return error;
  });
};

export const updateNote = (id, fields) => {
  return Note.findById(id)
    .then((note) => {
    // check out this classy way of updating only the fields necessary
      Object.keys(fields).forEach((k) => {
        note[k] = fields[k];
      });
      return note.save();
    });
};
