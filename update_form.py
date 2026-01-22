import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the new quote section
new_section = '''        <!-- Quote Start -->
        <div
          class="container-fluid quote my-5 py-5"
          data-parallax="scroll"
          data-image-src="img/cool coffe india.jpg"
        >
          <div class="container py-5">
            <div class="row justify-content-center">
              <div class="col-lg-7">
                <div
                  class="bg-white rounded p-4 p-sm-5 wow fadeIn"
                  data-wow-delay="0.5s"
                >
                  <h1 class="display-5 text-center mb-5">Get In Touch</h1>
                  <p class="text-center mb-4">
                    Have questions about our agriculture land or farmhouse plots? Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                  <form
                    id="homeContactForm"
                    action="https://formsubmit.co/greennspacess@gmail.com"
                    method="POST"
                    novalidate
                  >
                    <div class="row g-3">
                      <div class="col-md-6">
                        <div class="form-floating">
                          <input
                            type="text"
                            class="form-control bg-light border-0"
                            id="home_name"
                            name="name"
                            placeholder="Your Name"
                            required
                            minlength="2"
                            maxlength="100"
                            pattern="[A-Za-z\\s]+"
                          />
                          <label for="home_name">Your Name</label>
                          <div class="invalid-feedback">
                            Please enter a valid name (letters only, 2-100 characters)
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-floating">
                          <input
                            type="email"
                            class="form-control bg-light border-0"
                            id="home_email"
                            name="email"
                            placeholder="Your Email"
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
                          />
                          <label for="home_email">Your Email</label>
                          <div class="invalid-feedback">
                            Please enter a valid email address
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-floating">
                          <input
                            type="tel"
                            class="form-control bg-light border-0"
                            id="home_phone"
                            name="phone"
                            placeholder="Your Phone"
                            required
                            pattern="[0-9]{10}"
                            maxlength="10"
                          />
                          <label for="home_phone">Your Phone (10 digits)</label>
                          <div class="invalid-feedback">
                            Please enter a valid 10-digit phone number
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-floating">
                          <select
                            class="form-control bg-light border-0"
                            id="home_interest"
                            name="interest"
                            required
                          >
                            <option value="">Select Interest</option>
                            <option value="Purandhar Project">Purandhar Project</option>
                            <option value="Khed Project">Khed Project</option>
                            <option value="Konkan Project">Konkan Project</option>
                            <option value="Mulshi Project">Mulshi Project</option>
                            <option value="General Inquiry">General Inquiry</option>
                          </select>
                          <label for="home_interest">Project Interest</label>
                          <div class="invalid-feedback">
                            Please select your area of interest
                          </div>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-floating">
                          <input
                            type="text"
                            class="form-control bg-light border-0"
                            id="home_subject"
                            name="subject"
                            placeholder="Subject"
                            required
                            minlength="5"
                            maxlength="200"
                          />
                          <label for="home_subject">Subject</label>
                          <div class="invalid-feedback">
                            Please enter a subject (5-200 characters)
                          </div>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-floating">
                          <textarea
                            class="form-control bg-light border-0"
                            placeholder="Leave a message here"
                            id="home_message"
                            name="message"
                            style="height: 150px"
                            required
                            minlength="10"
                            maxlength="1000"
                          ></textarea>
                          <label for="home_message">Message</label>
                          <div class="invalid-feedback">
                            Please enter your message (10-1000 characters)
                          </div>
                        </div>
                      </div>

                      <input
                        type="text"
                        name="_honey"
                        style="display: none"
                        tabindex="-1"
                        autocomplete="off"
                      />

                      <input
                        type="hidden"
                        name="_subject"
                        value="New Contact Form Submission from GREENSPACESS (Home Page)"
                      />
                      <input type="hidden" name="_captcha" value="false" />
                      <input type="hidden" name="_template" value="table" />
                      <input
                        type="hidden"
                        name="_next"
                        value="https://ujagare.github.io/greenspacess/index.html?success=true"
                      />

                      <div class="col-12 text-center">
                        <button
                          class="btn btn-primary py-3 px-4"
                          type="submit"
                          id="homeSubmitBtn"
                        >
                          <span class="btn-text">Send Message</span>
                          <span
                            class="spinner-border spinner-border-sm d-none"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        </button>
                      </div>

                      <div class="col-12">
                        <div
                          id="homeFormMessage"
                          class="alert d-none"
                          role="alert"
                        ></div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Quote End -->'''

# Replace the quote section
pattern = r'<!-- Quote Start -->.*?<!-- Quote End -->'
content = re.sub(pattern, new_section, content, flags=re.DOTALL)

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Form updated successfully!")
