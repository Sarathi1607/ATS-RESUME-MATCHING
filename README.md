# Graphic Design Portfolio Website

A modern, interactive portfolio website for graphic designers with email backend functionality and easy content management.

## Features

- 🎨 **Modern Design** - Beautiful gradient backgrounds, smooth animations, and responsive layout
- 📧 **Contact Form** - Backend email integration to receive messages directly to your inbox
- 🖼️ **Interactive Portfolio** - Lightbox gallery with hover effects and category filtering
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Easy Content Management** - Update all content by editing a single JSON file
- 🎯 **Sections Included**:
  - Hero section with call-to-action
  - About section with bio and skills
  - Services showcase
  - Portfolio gallery with filters
  - Contact form with social links

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Email Settings

Set up environment variables for email functionality:

```bash
export EMAIL_USER="your-email@gmail.com"
export EMAIL_PASS="your-app-password"
```

**For Gmail:**
1. Enable 2-factor authentication on your Google account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the generated app password (not your regular password)

**Alternative:** Edit `app.py` directly and replace the default values in the configuration section.

### 3. Customize Your Content

Edit `content.json` to update all website content:

- **Personal Information**: Name, title, email, phone, location, bio
- **Portfolio Projects**: Add/remove projects with images, descriptions, and categories
- **Services**: Update your service offerings
- **Skills**: Modify skill levels
- **Social Links**: Update your social media profiles

### 4. Run the Application

```bash
python app.py
```

The website will be available at: `http://localhost:5000`

## Content Management Guide

All content is managed through `content.json`. Here's what you can edit:

### Personal Information
```json
"personal": {
  "name": "Your Name",
  "title": "Your Title",
  "email": "your-email@example.com",
  ...
}
```

### Portfolio Projects
```json
"portfolio": [
  {
    "title": "Project Name",
    "category": "Category",
    "description": "Project description",
    "image": "image-url",
    "tags": ["tag1", "tag2"]
  }
]
```

### Services
```json
"services": [
  {
    "icon": "🎨",
    "title": "Service Name",
    "description": "Service description"
  }
]
```

### Skills
```json
"skills": [
  { "name": "Skill Name", "level": 95 }
]
```

## Project Structure

```
/vercel/sandbox/
├── app.py                 # Flask backend with email API
├── content.json           # All website content (EDIT THIS!)
├── requirements.txt       # Python dependencies
├── templates/
│   └── index.html        # Main HTML template
└── static/
    ├── css/
    │   └── style.css     # Styles and animations
    └── js/
        └── script.js     # Interactive functionality
```

## Customization Tips

1. **Change Colors**: Edit CSS variables in `static/css/style.css` (`:root` section)
2. **Add More Sections**: Add HTML in `templates/index.html` and style in CSS
3. **Portfolio Images**: Use high-quality images (recommended: 800x600px)
4. **Email Provider**: Change SMTP settings in `app.py` for other email providers

## Email Configuration for Different Providers

### Gmail
```python
MAIL_SERVER = 'smtp.gmail.com'
MAIL_PORT = 587
```

### Outlook/Hotmail
```python
MAIL_SERVER = 'smtp-mail.outlook.com'
MAIL_PORT = 587
```

### Yahoo
```python
MAIL_SERVER = 'smtp.mail.yahoo.com'
MAIL_PORT = 587
```

## Troubleshooting

**Email not sending?**
- Check your email credentials
- Ensure 2FA is enabled and you're using an app password
- Check firewall/antivirus settings

**Content not loading?**
- Verify `content.json` is valid JSON (use a JSON validator)
- Check browser console for errors

**Styling issues?**
- Clear browser cache
- Check that static files are being served correctly

## Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **Email**: Flask-Mail
- **Fonts**: Google Fonts (Poppins, Playfair Display)
- **Images**: Unsplash (placeholder images)

## License

Free to use for personal and commercial projects.

---

**Need help?** Check the code comments or modify `content.json` to get started!
