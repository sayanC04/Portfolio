# Portfolio Website

This is a personal portfolio website built with HTML, CSS, and JavaScript.

## Project Structure

- `index.html`: The main HTML file containing the content and structure of the portfolio.
- `styles.css`: The CSS file containing all the styles, animations, and responsive design rules.
- `script.js`: The JavaScript file that handles interactivity, such as the mobile menu, typing effect, scroll animations, and more.
- `sayan-photo-1.jpg`: The profile image displayed in the Hero and About sections.
- `Sayan_Chakraborty_Resume.pdf`: The resume file that visitors can download.

## How to Update the PDF (Resume)

Since this is a static website, the PDF is served as a local file directly from the project folder. To update your resume:

1. **Add the new PDF:** Place your new PDF file (e.g., `New_Resume.pdf`) into the same folder as `index.html`.
2. **Update `index.html`:** Open `index.html` in a text editor.
3. **Find the resume link:** Look for the download button link, which looks like this (around line 105):
   ```html
   <a href="Sayan_Chakraborty_Resume.pdf" target="_blank" class="btn btn-g" id="hero-resume" title="Download Resume">
   ```
4. **Change the `href` attribute:** Replace `Sayan_Chakraborty_Resume.pdf` with the exact filename of your new PDF.
   ```html
   <a href="New_Resume.pdf" target="_blank" class="btn btn-g" id="hero-resume" title="Download Resume">
   ```
5. Save the file. Your resume is now updated!

## How to Update the Profile Image

Just like the PDF, images are loaded locally from the project folder. To change your profile picture:

1. **Add the new image:** Place your new image file (e.g., `my-new-photo.jpg`) into the same folder as `index.html`.
2. **Update `index.html`:** Open `index.html` in a text editor.
3. **Find the image tag:** Look for the `<img ...>` tag where the photo is displayed (around line 79):
   ```html
   <img src="sayan-photo-1.jpg" alt="Sayan Chakraborty - Cloud & DevOps Engineer" class="profile-img">
   ```
4. **Change the `src` attribute:** Replace `sayan-photo-1.jpg` with the exact filename of your new image.
   ```html
   <img src="my-new-photo.jpg" alt="Sayan Chakraborty - Cloud & DevOps Engineer" class="profile-img">
   ```
5. Save the file. Refresh the page in your browser to see the new image.
