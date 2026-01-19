/**
 * Main - Window Manager
 * Duality: PowerShell (Windows) + Terminal (Linux)
 */

(function() {
  'use strict';

  var about = document.getElementById('about');
  var projects = document.getElementById('projects');
  var aboutContent = document.getElementById('about-content');
  var projectsContent = document.getElementById('projects-content');

  // PowerShell window (Windows style)
  about.onclick = function() {
    var isMobile = window.innerWidth < 600;
    new WinBox({
      title: 'Windows PowerShell',
      width: isMobile ? '90%' : '500px',
      height: isMobile ? '35%' : '320px',
      max: false,
      full: false,
      x: isMobile ? 'center' : '5%',
      y: isMobile ? 'center' : '5%',
      html: aboutContent.innerHTML,
      class: 'powershell-window',
      onfocus: function() {
        this.setBackground('#012456');
      },
      onblur: function() {
        this.setBackground('#1a3a5c');
      }
    });
  };

  // Linux terminal window
  projects.onclick = function() {
    var isMobile = window.innerWidth < 600;
    new WinBox({
      title: 'impulsado@localhost: ~/projects',
      width: isMobile ? '90%' : '500px',
      height: isMobile ? '60%' : '420px',
      max: false,
      full: false,
      x: isMobile ? 'center' : '6%',
      y: isMobile ? 'center' : '5%',
      html: projectsContent.innerHTML,
      class: 'linux-window',
      onfocus: function() {
        this.setBackground('#2d2d2d');
      },
      onblur: function() {
        this.setBackground('#444');
      }
    });
  };

})();
