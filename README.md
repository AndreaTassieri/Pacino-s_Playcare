# Pacino's Playcare

A simple landing page for locals in Glasgow to get in contact with a private dog-sitter.

## Website editing manual

This README is a practical guide for making common updates to the site without having to dig through the codebase.

### Main files you are likely to edit

- `index.html` — page text, sections, links, booking status, and content placement
- `css/style.css` — colours, spacing, layout, responsive styling, and visual details
- `js/script.js` — interactive behaviour, if any is added later
- `images/` — all website images, logos, and icons

If you want to change what visitors see, start with `index.html`.

---

## 1. Changing text on the site

Most visible text on the page is written in `index.html`.

### What can usually be changed there
- headline text
- paragraphs and descriptions
- buttons and call-to-action text
- section headings
- footer text
- contact details
- service descriptions
- pricing notes
- availability wording

### How to change text
1. Open `index.html`
2. Search for the current text you want to update
3. Replace it with the new wording
4. Save the file
5. Refresh the site in your browser

### Example
If you find something like:

```html
<h1>Trusted dog-sitting in Glasgow</h1>
```

You can change it to:

```html
<h1>Reliable dog care for Glasgow locals</h1>
```

### Tip
If you are not sure where a piece of text comes from, use your editor’s search function and look for a unique word from that sentence.

---

## 2. Swapping out images

Images are usually stored in the `images/` folder and linked from `index.html`.

### Typical steps to replace an image
1. Find the image in `index.html`
2. Note the file name in the `src` attribute
3. Replace the image file inside `images/`
4. Keep the same file name if you want to avoid changing the HTML
5. If you use a new file name, update the `src` path in the HTML
6. Refresh the page to confirm the new image appears

### Example
```html
<img src="images/dog-sitter.jpg" alt="Dog sitter with a dog">
```

If you want to use a new file called `images/new-dog-photo.jpg`, update it to:

```html
<img src="images/new-dog-photo.jpg" alt="A happy dog outdoors">
```

### Best practices for images
- Use clear, compressed web-friendly formats like `.jpg`, `.png`, or `.webp`
- Keep file sizes reasonable so the page loads quickly
- Update the `alt` text if the image content changes
- Try to keep the same aspect ratio if the layout depends on it

### If an image does not update
- check the file name is exact
- check the image is in the right folder
- refresh the page hard if your browser cached the old version
- confirm the HTML points to the right path

---

## 3. Changing the “taking bookings” status

If the site shows whether bookings are open or closed, that text will usually be in `index.html`.

### Look for wording such as
- `Taking bookings`
- `Bookings open`
- `Fully booked`
- `Not taking bookings`
- `Unavailable`
- `Closed`

### How to switch the status
1. Open `index.html`
2. Find the booking status text
3. Change the wording to match the current state
4. Save and refresh the page

### Example
You might see:

```html
<p class="booking-status open">Taking bookings now</p>
```

To mark bookings as closed, change it to something like:

```html
<p class="booking-status closed">Not taking bookings right now</p>
```

### Important
If the status uses CSS classes like `open`, `closed`, `available`, or `unavailable`, you may also want to update `css/style.css` so the colour or badge style matches the new status.

For example, the class might control whether the status appears green or red.

### Common use case
This is the main thing you may want to toggle regularly, so it is worth keeping the wording short, clear, and easy to search for in the HTML.

---

## 4. Updating contact details

Any email address, phone number, booking form, or social link will usually be in `index.html`.

### Common examples
- `mailto:` links for email
- `tel:` links for phone calls
- WhatsApp links
- Instagram or Facebook links
- external booking links

### Example
```html
<a href="mailto:hello@example.com">Email us</a>
```

Change it to:

```html
<a href="mailto:newaddress@example.com">Email us</a>
```

### Tip
If you change a link target, check both the visible text and the actual `href` value.

---

## 5. Changing colours, fonts, spacing, or layout

Visual design changes usually live in `css/style.css`.

### Things controlled by CSS
- background colours
- text colours
- font sizes and font families
- spacing between sections
- button styles
- card and banner appearance
- mobile responsiveness
- alignment and layout

### How to edit CSS safely
1. Open `css/style.css`
2. Search for the class or element you want to change
3. Edit one value at a time
4. Refresh the page and check the result

### Example
To change a button colour:

```css
.cta-button {
  background: #ff7a59;
}
```

### Tip
If something looks wrong after a CSS change, undo the last edit and try a smaller adjustment.

---

## 6. Changing interactive behaviour

If the site includes any interactive features, they will usually be in `js/script.js`.

### Possible examples
- menu toggles
- smooth scrolling
- form validation
- booking-related toggles
- status updates driven by scripts

If you are only changing text or images, you probably do not need to touch this file.

---

## 7. Common changes you may want to make regularly

These are the updates most likely to happen often:

- changing booking availability
- updating the main headline
- changing a contact email or phone number
- swapping a featured image
- updating seasonal wording
- changing prices or service notes
- editing testimonials or reviews
- adjusting opening hours or availability

For these, start with `index.html`.

---

## 8. Changes that happen less often

These are the bigger or more structural updates:

- redesigning the page layout
- changing fonts and colours
- adding a new section
- rearranging content blocks
- replacing several images
- adding new scripts or features

For these, you will likely need to edit both `index.html` and `css/style.css`.

---

## 9. Quick reference

| What you want to change | Where to change it |
| --- | --- |
| Main page text | `index.html` |
| Booking status | `index.html` |
| Contact details | `index.html` |
| Images | `images/` and sometimes `index.html` |
| Colours and spacing | `css/style.css` |
| Layout and responsiveness | `css/style.css` |
| Interactive behaviour | `js/script.js` |

---

## 10. Suggested editing workflow

1. Decide what needs changing
2. Find the matching file from the table above
3. Search for the text, file name, or class name
4. Make one change
5. Refresh the browser and check the result
6. Repeat if needed

---

## 11. Notes for future updates

- Keep file names stable where possible so links do not break
- Use descriptive image names
- Update `alt` text whenever an image changes
- Keep booking status wording obvious and easy to search for
- Document new sections or features here if they are added later

---

If you are unsure where something lives, start with `index.html`, then check `css/style.css`, then `js/script.js`.
