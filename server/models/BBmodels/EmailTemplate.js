const mongoose = require('mongoose');
const _ = require('lodash');

const { Schema } = mongoose;

const mongoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const EmailTemplate = mongoose.model('EmailTemplate', mongoSchema);

function insertTemplates() {
  const templates = [
    {
      name: 'welcome',
      subject: 'Welcome to basics.fitness',
      message: `<%= userName %>,
        <p>
          At Builder Book, we are excited to help you build useful, production-ready web apps from scratch.
        </p>
        <p>
          See list of available books here.
        </p>

        Kelly & Timur,
        Team BB
      `,
    },
    {
      name: 'purchase',
      subject: 'You purchased a book a basics.fitness',
      message: `<%=userName %>,
        <p>
          Thank you for joining IO Fitness! You will get a confirmation email from Stripe shortly.
        </p>
        <p> Start improving now: <a href="{{bookUrl}}" target="_blank">
        </p>
        <p>
          If you have any questions about the exercises, please ask them on our forums. 
        </p>

        Jonathan White - IO Fitness
        `,
    },
  ];

  templates.forEach(async (template) => {
    if ((await EmailTemplate.find({ name: template.name }).countDocuments()) > 0) {
    }
  });
}

insertTemplates();

async function getEmailTemplate(name, params) {
  const source = await EmailTemplate.findOne({ name });
  if (!source) {
    throw new Error(`No EmailTemplates found.
      Please check that at least one is generated at server startup,
      restart your server and try again.`);
  }

  return {
    message: _.template(source.message)(params),
    subject: _.template(source.subject)(params),
  };
}

exports.insertTemplates = insertTemplates;
exports.getEmailTemplate = getEmailTemplate;
