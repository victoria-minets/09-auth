'use client';

export default function ErrorNotes({ error }: { error: Error }) {
  console.error('Error log:', error);

  return <p>Could not fetch the list of notes. {error.message}</p>;
}
