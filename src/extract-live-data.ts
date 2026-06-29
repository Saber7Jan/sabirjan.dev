async function main() {
  try {
    const url = 'https://saber7jan.github.io/sabirjan.dev/data.json';
    const response = await fetch(url);
    if (!response.ok) {
       console.log('data.json not found directly. Let us search inside the js bundle.');
       return;
    }
    const json = await response.json();
    console.log('--- LIVE DATA.JSON DISCOVERED ---');
    console.log(JSON.stringify(json.projects, null, 2));
  } catch (err: any) {
    console.error('Error:', err.message);
  }
}

main();
