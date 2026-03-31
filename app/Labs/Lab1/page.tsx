"use client";

export default function Lab1() {
  return (
    <>
      <div id="wd-lab1">
        <h2>Lab 1</h2>
        <h3>HTML Examples</h3>
        <div id="wd-h-tag">
          {/* TODO: CHANGE */}
          <h4>Heading Tags</h4>
          Text documents are often broken up into several sections and
          subsections. Each section is usually prefaced with a short title or
          heading that attempts to summarize the topic of the section it
          precedes. For instance this paragraph is preceded by the heading
          Heading Tags. The font of the section headings are usually larger and
          bolder than their subsection headings. This document uses headings to
          introduce topics such as HTML Documents, HTML Tags, Heading Tags, etc.
          HTML heading tags can be used to format plain text so that it renders
          in a browser as large headings. There are 6 heading tags for different
          sizes: h1, h2, h3, h4, h5, and h6. Tag h1 is the largest heading and
          h6 is the smallest heading.
        </div>
        <div id="wd-p-tag">
          <h4>Paragraph Tag</h4>
          <p id="wd-p-2">
            This is the first paragraph. The paragraph tag is used to format
            vertical gaps between long pieces of text like this one.
          </p>
          <p id="wd-p-3">
            This is the second paragraph. Even though there is a deliberate
            white gap between the paragraph above and this paragraph, by default
            browsers render them as one contiguous piece of text as shown here
            on the right.
          </p>
          <p id="wd-p-4">
            This is the third paragraph. Wrap each paragraph with the paragraph
            tag to tell browsers to render the gaps.
          </p>
        </div>
        {/*Making Pizza Ordered List*/}
        <h4>List Tags </h4>
        <h5>Ordered List Tag</h5>
        How to make pizza:
        <ol id="wd-pizza-recipe">
          <li>Preheat the oven to 450 degrees</li>
          <li>
            Take your pizza dough and roll it on the counter to twelve inches
          </li>
          <li>Spread tomato sauce on the dough</li>
          <li>Add cheese and toppings of your choice</li>
          <li>Bake the pizza in the oven for 15 minutes</li>
          <li>Take pizza out of the oven, and place on a cooling wrack</li>
          <li>Wait 5 minutes before enjoying!</li>
        </ol>
        {/*Unordered List Tag. WRITE A LIST OF AT LEAST 3 OF YOUR FAVORITE BOOKS*/}
        <h5>Unordered List Tag</h5>
        Five of my favorite books:
        <ul id="wd-favorite-books">
          <li>Practical Magic by Alice Hoffman</li>
          <li>Dune by Frank Herbert </li>
          <li>Harry Potter series b J.K. Rowling</li>
          <li>1984 by George Orwell</li>
          <li>Life of Pi by Yann Martel</li>
        </ul>
        {/*TABLE SECTION: 
        This course has 10 quizzes. 
        Add the 7 quizzes that are missing in the table. 
        Use quiz names such as Q3, Q4, through Q10.
        Make up different dates and scores. */}
        <div id="wd-tables">
          <h4>Table Tag</h4>
          <table border={1} width="100%">
            <thead>
              <tr>
                <th>Quiz</th>
                <th>Topic</th>
                <th>Date</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Q1</td>
                <td>HTML</td>
                <td>9/22/25</td>
                <td>90</td>
              </tr>
              <tr>
                <td>Q2</td>
                <td>CSS</td>
                <td>9/29/25</td>
                <td>90</td>
              </tr>
              <tr>
                <td>Q3</td>
                <td>CSS</td>
                <td>10/6/25</td>
                <td>85</td>
              </tr>
              <tr>
                <td>Q4</td>
                <td>JavaScript</td>
                <td>10/13/25</td>
                <td>95</td>
              </tr>
              <tr>
                <td>Q5</td>
                <td>JavaScript</td>
                <td>10/20/25</td>
                <td>88</td>
              </tr>
              <tr>
                <td>Q6</td>
                <td>Redux</td>
                <td>11/03/25</td>
                <td>75</td>
              </tr>
              <tr>
                <td>Q7</td>
                <td>Redux</td>
                <td>11/10/25</td>
                <td>92</td>
              </tr>
              <tr>
                <td>Q8</td>
                <td>Node</td>
                <td>11/24/25</td>
                <td>89</td>
              </tr>
              <tr>
                <td>Q9</td>
                <td>Node</td>
                <td>12/01/25</td>
                <td>91</td>
              </tr>
              <tr>
                <td>Q10</td>
                <td>Mongo</td>
                <td>12/15/25</td>
                <td>90</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>Average</td>
                <td>88.5</td>
              </tr>
            </tfoot>
          </table>
        </div>
        {/*IMAGE TAG*/}
        <div id="wd-images">
          <h2>Image tag</h2>
          Loading a local image: <br />
          <img
            id="wd-teslabot"
            src="/images/teslabot.jpg"
            height="200"
            width="200"
            alt="Tesla Bot"
          />
        </div>
        {/*CREATING WEB FORMS -- SAMPLE CODE FROM PROFESSOR*/}
        <div id="wd-forms">
          <h4>Form Elements</h4>
          <form id="wd-text-fields">
            <h5>Text Fields</h5>
            <label htmlFor="wd-text-fields-username">Username:</label>
            <input placeholder="jdoe" id="wd-text-fields-username" /> <br />
            <label htmlFor="wd-text-fields-password">Password:</label>
            <input
              type="password"
              defaultValue="123@#$asd"
              id="wd-text-fields-password"
            />
            <br />
            <label htmlFor="wd-text-fields-first-name">First name:</label>
            <input
              type="text"
              title="John"
              id="wd-text-fields-first-name"
            />{" "}
            <br />
            <label htmlFor="wd-text-fields-last-name">Last name:</label>
            <input
              type="text"
              placeholder="Doe"
              defaultValue="Wonderland"
              title="The last name"
              id="wd-text-fields-last-name"
            />
            {/* copy rest of form elements here  */}
          </form>
        </div>
        {/*TEXT AREA  -- SAMPLE CODE FROM PROFESSOR*/}
        <h5>Text boxes</h5>
        <label>Text Area:</label>
        <br />
        <textarea
          id="wd-textarea"
          cols={30}
          rows={10}
          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
      </div>
      {/* CREATING INTERACTIVE BUTTONS. 
          To practice creating buttons,
          copy the code below at the end of page.tsx.
        Confirm that clicking the button 
        displays an alert box with an optimistic message.*/}
      <h5 id="wd-buttons">Buttons</h5>
      <button
        type="button"
        onClick={() => alert("Success: You clicked this button!")}
        id="wd-button-1"
      >
        Click me!
      </button>
      {/* CREATING EXCLUSIVE CHOICES WITH HTML RADIO BUTTONS*/}
      <h5 id="wd-radio-buttons">Radio buttons</h5>
      {/*CREATING MULTIPLE CHOICES WITH HTML RADIO BUTTONS*/}
      <label>Favorite movie genre:</label>
      <input type="radio" name="radio-genre" id="wd-radio-comedy" />
      <label htmlFor="wd-radio-comedy">Comedy</label>
      <br />
      <input type="radio" name="radio-genre" id="wd-radio-drama" />
      <label htmlFor="wd-radio-drama">Drama</label>
      <br />
      <input type="radio" name="radio-genre" id="wd-radio-scifi" />
      <label htmlFor="wd-radio-scifi">Science Fiction</label>
      <br />
      <input type="radio" name="radio-genre" id="wd-radio-fantasy" />
      <label htmlFor="wd-radio-fantasy">Fantasy</label>
      {/* CREATING MULTIPLE CHOICES WITH HTML CHECKBOXES*/}
      <h5 id="wd-checkboxes">Checkboxes</h5>
      <label>Favorite movie genre:</label>
      <input type="checkbox" name="check-genre" id="wd-chkbox-comedy" />
      <label htmlFor="wd-chkbox-comedy">Comedy</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-drama" />
      <label htmlFor="wd-chkbox-drama">Drama</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-scifi" />
      <label htmlFor="wd-chkbox-scifi">Science Fiction</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy" />
      <label htmlFor="wd-chkbox-fantasy">Fantasy</label>
      {/*Drop down bar*/}
      <h4 id="wd-dropdowns">Dropdowns</h4>
      <h5>Select one</h5>
      <label htmlFor="wd-select-one-genre">Favorite movie genre:</label>
      <br />
      <select id="wd-select-one-genre" defaultValue="SCIFI">
        <option value="COMEDY">Comedy</option>
        <option value="DRAMA">Drama</option>
        <option value="SCIFI">Science Fiction</option>
        <option value="FANTASY">Fantasy</option>
      </select>
      <h5>Select multiple</h5>
      <label htmlFor="wd-multi-select">Favorite movie genres:</label>
      <br />
      <select
        id="wd-select-many-genre"
        multiple
        defaultValue={["SCIFI", "FANTASY"]}
      >
        <option value="COMEDY">Comedy</option>
        <option value="DRAMA">Drama</option>
        <option value="SCIFI">Science Fiction</option>
        <option value="FANTASY">Fantasy</option>
      </select>
      {/*date, email, number, and range which configure the input field to accept only dates, email addresses, numbers, and numbers within a specified range respectively.*/}
      <h4>Other HTML field types</h4>
      <label htmlFor="wd-text-fields-email"> Email: </label>
      <input
        type="email"
        placeholder="jdoe@somewhere.com"
        id="wd-text-fields-email"
      />
      <br />
      <label htmlFor="wd-text-fields-salary-start"> Starting salary:</label>
      <input
        type="number"
        defaultValue="100000"
        placeholder="1000"
        id="wd-text-fields-salary-start"
      />
      <br />
      <label htmlFor="wd-text-fields-rating"> Rating: </label>
      <input
        type="range"
        defaultValue="4"
        max="5"
        placeholder="Doe"
        id="wd-text-fields-rating"
      />
      <br />
      <label htmlFor="wd-text-fields-dob"> Date of birth: </label>
      <input type="date" defaultValue="2000-01-21" id="wd-text-fields-dob" />
      <br />
      {/*ANCHOR TAG TO MY GITHUB*/}
      <h4>Anchor Tag</h4>My GitHub link:
      <a
        href="https://github.com/ellapitts/kambaz-next-js/tree/main/src/app/Labs/Lab1"
        id="wd-github"
      >
        {" "}
        click here
      </a>
      <br />
      to get to my GitHub repository for this module.
      <br />
    </>
  );
}
