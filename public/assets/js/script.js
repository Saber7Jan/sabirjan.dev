document.addEventListener('DOMContentLoaded', () => {
  fetch('/data.json')
    .then(response => response.json())
    .then(data => {
      // Projects (dynamic cards with PDF links)
      if (document.getElementById('projects-list')) {
        const list = document.getElementById('projects-list');
        data.projects.forEach(proj => {
          const div = document.createElement('div');
          div.className = 'project-card';  // Add CSS for styling
          div.innerHTML = `<h3>${proj.title}</h3><p>${proj.description}</p><p>Tech: ${proj.tech.join(', ')}</p>
            <a href="${proj.link}">Demo</a> | <a href="${proj.thesis}">Thesis PDF</a> | <a href="${proj.research_paper}">Paper PDF</a>`;
          list.appendChild(div);
        });
      }

      // Education (with embedded PDF previews or links)
      if (document.getElementById('edu-list')) {
        const list = document.getElementById('edu-list');
        data.education.forEach(edu => {
          const div = document.createElement('div');
          div.innerHTML = `<h3>${edu.degree}</h3><p>${edu.institution} (${edu.years}) - ${edu.cgpa || edu.grade}</p><p>${edu.details}</p>
            <a href="${edu.certificate}">View Transcript/Cert</a>`;
          list.appendChild(div);
        });
      }

      // Awards Filter (dynamic list with cert links)
      if (document.getElementById('awards-list')) {
        const list = document.getElementById('awards-list');
        const filterInput = document.getElementById('award-filter');
        function renderAwards(filtered = data.awards) {
          list.innerHTML = '';
          filtered.forEach(award => {
            const li = document.createElement('li');
            li.innerHTML = `${award.title} (${award.year}) - ${award.category}<br><a href="${award.certificate}">View Certificate</a>`;
            list.appendChild(li);
          });
        }
        renderAwards();
        filterInput.addEventListener('input', (e) => {
          const term = e.target.value.toLowerCase();
          const filtered = data.awards.filter(a => a.category.toLowerCase().includes(term) || a.title.toLowerCase().includes(term));
          renderAwards(filtered);
        });
      }

      // Internships (similar to projects)
      if (document.getElementById('internships-list')) {
        const list = document.getElementById('internships-list');
        data.internships.forEach(intern => {
          const div = document.createElement('div');
          div.innerHTML = `<h4>${intern.title}</h4><p>${intern.duration}</p><p>${intern.details}</p><a href="${intern.certificate}">Certificate</a>`;
          list.appendChild(div);
        });
      }

      // Charts: Project Tech Count (bar)
      if (document.getElementById('projectChart')) {
        const ctx = document.getElementById('projectChart').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.projects.map(p => p.title),
            datasets: [{ label: 'Tech Stack Size', data: data.projects.map(p => p.tech.length), backgroundColor: 'rgba(75,192,192,0.6)' }]
          }
        });
      }

      // Grade Chart (from BS transcript example data; customize with your marks)
      if (document.getElementById('gradeChart')) {
        const ctx = document.getElementById('gradeChart').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Fall 2020', 'Spring 2021', 'Fall 2021', 'Spring 2022'],  // Semesters
            datasets: [{ label: 'GPA', data: [2.88, 2.71, 2.21, 2.46], borderColor: 'blue' }]
          }
        });
      }

      // Skills Radar (unchanged, but tie to internships)
      // Add AOS.init() for animations
    });
});
