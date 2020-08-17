import axios from "axios";

const BASE_URL = `http://private-9aad-note10.apiary-mock.com/notes`

export interface Note {
  id: number;
  title: string;
}

export interface NotesResult {
  notes: Note[];
}

export async function getNotes(): Promise<NotesResult> {
  const url = BASE_URL;

  try {
    const notesResponse = await axios.get<Note[]>(url);

    return {
      notes: notesResponse.data,
    };
  } catch (err) {
    throw err;
  }
}

export async function getNote(number: number | null) {
  const url = `${BASE_URL}/${number}`;

  const { data } = await axios.get<Note>(url);
  return data;
}

export async function createNote(title: string) {
  const url = `${BASE_URL}`;

  const { data } = await axios.post<Note>(url, { title });
  return data;
}

export async function updateNote(number: number | null, title: string) {
  const url = `${BASE_URL}/${number}`;

  const { data } = await axios.put<Note>(url, { title });
  return data;
}

export async function deleteNote(number: number) {
  const url = `${BASE_URL}/${number}`;

  const { data } = await axios.delete<Note>(url);
  return data;
}
