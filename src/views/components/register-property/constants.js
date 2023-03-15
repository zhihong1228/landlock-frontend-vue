import { onlyUnique } from '@/utils'
import QuestionModel, { ChoiceOption, QuestionType } from '../../../../vue-flow-form/src/models/QuestionModel'
import NYCTitles from './nyc-titles'

const REGISTER_PROPERTY_QUESTIONS = [
  new QuestionModel({
    id: 'propertyType',
    title: 'What\'s the type of property that you wish to protect?',
    type: QuestionType.MultipleChoice,
    multiple: false,
    required: true,
    nextStepOnAnswer: true,
    allowOther: true,
    options: [
      new ChoiceOption({
        label: 'Condominium',
        value: 'Condominium',
      }),
      new ChoiceOption({
        label: 'Vacant Land',
        value: 'Vacant Land',
      }),
      new ChoiceOption({
        label: '1-3 Family house',
        value: '1-3 Family house',
      }),
      new ChoiceOption({
        label: 'Commercial Building',
        value: 'Commercial Building',
      }),
      new ChoiceOption({
        label: 'Mixed use building',
        value: 'Mixed use building',
      }),
    ],
  }),
  new QuestionModel({
    id: 'fullAddress',
    title: 'What’s the property Address?',
    type: QuestionType.MultipleQuestions,
    autoFillAddress: true,
    required: true,
    questions: [
      new QuestionModel({
        id: 'address',
        placeholder: 'Address',
        type: QuestionType.Text,
        autoFillAddress: true,
        required: true,
        inline: true,
        maxWidth: 810,
        widthPC: 810,
      }),
      new QuestionModel({
        id: 'apartmentNumber',
        placeholder: 'Condo. number',
        type: 'apartment',
        required: false,
        inline: true,
        maxWidth: 190,
        widthPC: 190,
      }),
      new QuestionModel({
        id: 'lat-long',
        type: 'lat-long',
        required: false,
        inline: true,
        maxWidth: 130,
        widthPC: 130,
      }),
    ],
  }),
  new QuestionModel({
    id: 'knowBlockLot',
    title: 'Do you know the Block and Lot and/or Parcel ID number?',
    type: QuestionType.MultipleChoice,
    multiple: false,
    required: true,
    nextStepOnAnswer: true,
    options: [
      new ChoiceOption({
        label: 'Yes',
        value: true,
      }),
      new ChoiceOption({
        label: 'No',
        value: false,
      }),
    ],
    jump: {
      true: 'lot',
      false: 'price',
    },
  }),
  new QuestionModel({
    id: 'lot',
    type: QuestionType.MultipleQuestions,
    required: false,
    questions: [
      new QuestionModel({
        id: 'Nlot',
        placeholder: 'Lot Number',
        type: QuestionType.Text,
        required: false,
      }),
      new QuestionModel({
        id: 'Nblock',
        placeholder: 'Block Number',
        type: QuestionType.Text,
        required: false,
      }),
      new QuestionModel({
        id: 'Nparcel',
        placeholder: 'Parcel ID Number',
        type: QuestionType.Text,
        required: false,
      }),
    ],
  }),
  new QuestionModel({
    id: 'price',
    title: 'What’s the estimated property value?',
    type: QuestionType.Number,
    min: 0, // 0
    max: 25000000, // 25 million
    interval: 100,
    required: true,
    money: {
      decimal: '.',
      thousands: '',
      prefix: '$ ',
      suffix: '',
      precision: 2,
      masked: false,
    },
    // placeholder: '(Optional)',
  }),
  new QuestionModel({
    id: 'alreadyOwned',
    title: 'Do you already own the property?',
    type: QuestionType.MultipleChoice,
    multiple: false,
    required: true,
    nextStepOnAnswer: true,
    allowOther: false,
    options: [
      new ChoiceOption({
        label: 'I already own the property.',
        value: true,
      }),
      new ChoiceOption({
        label: 'I am in the process of buying the property',
        value: false,
      }),
    ],
    jump: {
      true: '0-ownershipType',
      false: 'paymentOptions',
    },
  }),
  new QuestionModel({
    id: 'paymentOptions',
    title: 'Payment options',
    type: QuestionType.MultipleChoice,
    multiple: false,
    required: true,
    nextStepOnAnswer: true,
    allowOther: false,
    options: [
      new ChoiceOption({
        label: 'Pay Now',
        value: true,
      }),
      new ChoiceOption({
        label: 'Pay At Closing',
        value: false,
      }),
    ],
    jump: {
      true: '0-ownershipType',
      false: 'titleCompany',
    },
  }),
  new QuestionModel({
    id: 'titleCompany',
    title: 'What\'s the name of the title company?',
    type: QuestionType.Text,
    autoFillTexts: NYCTitles.map(company => company.title).filter(onlyUnique).sort(),
    readonly: false,
    required: true,
    // jump: () => 'addNewOwner', // use percentage question if not commented
  }),
  new QuestionModel({
    id: '0-ownershipType',
    title: 'Who owns the property?',
    type: QuestionType.MultipleChoice,
    multiple: false,
    required: true,
    nextStepOnAnswer: true,
    allowOther: false,
    options: [
      new ChoiceOption({
        label: 'Person',
        value: 'Person',
      }),
      new ChoiceOption({
        label: 'Limited Liability Company',
        value: 'Limited Liability Company',
        disabled: true,
        // eslint-disable-next-line global-require
        imageSrc: require('@/assets/images/coming-soon.svg'),
      }),
      new ChoiceOption({
        label: 'Corporation',
        value: 'Corporation',
        disabled: true,
        // eslint-disable-next-line global-require
        imageSrc: require('@/assets/images/coming-soon.svg'),
      }),
      new ChoiceOption({
        label: 'Partnership',
        value: 'Partnership',
        disabled: true,
        // eslint-disable-next-line global-require
        imageSrc: require('@/assets/images/coming-soon.svg'),
      }),
      new ChoiceOption({
        label: 'Trust',
        value: 'Trust',
        disabled: true,
        // eslint-disable-next-line global-require
        imageSrc: require('@/assets/images/coming-soon.svg'),
      }),
      new ChoiceOption({
        label: 'Estate',
        value: 'Estate',
        disabled: true,
        // eslint-disable-next-line global-require
        imageSrc: require('@/assets/images/coming-soon.svg'),
      }),
    ],
    jump: {
      Person: '0-name',
      'Limited Liability Company': '0-LLCEntityName',
      Corporation: '0-CorpEntityName',
      Partnership: '0-PartEntityName',
      Trust: '0-TrustEntityName',
      Estate: '0-EstateEntityName',
    },
  }),
  new QuestionModel({
    id: '0-name',
    title: 'What’s your name?',
    type: QuestionType.Text,
    readonly: true,
    required: true,
    jump: () => 'addNewOwner', // use percentage question if not commented
  }),
  new QuestionModel({
    id: '0-LLCEntityName',
    title: 'What’s the name of the Entity owning the property?',
    subtitle: 'The name that you input here should be identical with the name on the property deed.',
    type: QuestionType.Text,
    required: true,
  }),
  new QuestionModel({
    id: '0-LLCEIN',
    title: 'What’s the property owner’s EIN?',
    type: QuestionType.Text,
    required: true,
  }),
  new QuestionModel({
    id: '0-isOwnerLLC',
    title: 'Are you the Manager, Managing Member, Officer or Owner/Member of ##EName##?',
    type: QuestionType.MultipleChoice,
    multiple: false,
    required: true,
    nextStepOnAnswer: true,
    allowOther: false,
    options: [
      new ChoiceOption({
        label: 'Yes',
        value: true,
      }),
      new ChoiceOption({
        label: 'No',
        value: false,
      }),
    ],
    jump: {
      true: '0-ownerTypeLLC',
      false: '0-personName',
    },
  }),
  new QuestionModel({
    id: '0-ownerTypeLLC',
    title: 'What\'s your position in the entity?',
    type: QuestionType.MultipleChoice,
    multiple: false,
    required: true,
    nextStepOnAnswer: true,
    allowOther: false,
    options: [
      new ChoiceOption({
        label: 'Manager',
        value: 'Manager',
      }),
      new ChoiceOption({
        label: 'Managing Member',
        value: 'Managing Member',
      }),
      new ChoiceOption({
        label: 'Officer',
        value: 'Officer',
      }),
      new ChoiceOption({
        label: 'Owner',
        value: 'Owner',
      }),
      new ChoiceOption({
        label: 'Member',
        value: 'Member',
      }),
      new ChoiceOption({
        label: 'Authorised Signatory',
        value: 'Authorised Signatory',
      }),
      new ChoiceOption({
        label: 'Other',
        value: 'Other',
      }),
    ],
    jump: () => '0-personName',
  }),
  new QuestionModel({
    id: '0-CorpEntityName',
    title: 'What’s the name of the Entity owning the property?',
    subtitle: 'The name that you input here should be identical with the name on the property deed.',
    type: QuestionType.Text,
    required: true,
  }),
  new QuestionModel({
    id: '0-CorpEIN',
    title: 'What’s the property owner’s EIN?',
    type: QuestionType.Text,
    required: true,
  }),
  new QuestionModel({
    id: '0-isOwnerCorp',
    title: 'Are you the President, Vice President, Officer or Owner/Shareholder of ##EName##?',
    type: QuestionType.MultipleChoice,
    multiple: false,
    required: true,
    nextStepOnAnswer: true,
    allowOther: false,
    options: [
      new ChoiceOption({
        label: 'Yes',
        value: true,
      }),
      new ChoiceOption({
        label: 'No',
        value: false,
      }),
    ],
    jump: {
      true: '0-ownerTypeCorp',
      false: '0-personName',
    },
  }),
  new QuestionModel({
    id: '0-ownerTypeCorp',
    title: 'What\'s your position in the entity?',
    type: QuestionType.MultipleChoice,
    multiple: false,
    required: true,
    nextStepOnAnswer: true,
    allowOther: false,
    options: [
      new ChoiceOption({
        label: 'President',
        value: 'President',
      }),
      new ChoiceOption({
        label: 'Vice President',
        value: 'Vice President',
      }),
      new ChoiceOption({
        label: 'Officer',
        value: 'Officer',
      }),
      new ChoiceOption({
        label: 'Owner',
        value: 'Owner',
      }),
      new ChoiceOption({
        label: 'Shareholder',
        value: 'Shareholder',
      }),
      new ChoiceOption({
        label: 'Authorised Signatory',
        value: 'Authorised Signatory',
      }),
      new ChoiceOption({
        label: 'Other',
        value: 'Other',
      }),
    ],
    jump: () => '0-personName',
  }),
  new QuestionModel({
    id: '0-PartEntityName',
    title: 'What’s the name of the Entity owning the property?',
    subtitle: 'The name that you input here should be identical with the name on the property deed.',
    type: QuestionType.Text,
    required: true,
  }),
  new QuestionModel({
    id: '0-PartEIN',
    title: 'What’s the property owner’s EIN?',
    type: QuestionType.Text,
    required: true,
  }),
  new QuestionModel({
    id: '0-isOwnerPart',
    title: 'Are you a General Partner, Partner/Owner or Officer of ##EName##?',
    type: QuestionType.MultipleChoice,
    multiple: false,
    required: true,
    nextStepOnAnswer: true,
    allowOther: false,
    options: [
      new ChoiceOption({
        label: 'Yes',
        value: true,
      }),
      new ChoiceOption({
        label: 'No',
        value: false,
      }),
    ],
    jump: {
      true: '0-ownerTypePart',
      false: '0-personName',
    },
  }),
  new QuestionModel({
    id: '0-ownerTypePart',
    title: 'What\'s your position in the entity?',
    type: QuestionType.MultipleChoice,
    multiple: false,
    required: true,
    nextStepOnAnswer: true,
    allowOther: false,
    options: [
      new ChoiceOption({
        label: 'General Partner',
        value: 'General Partner',
      }),
      new ChoiceOption({
        label: 'Partner/Owner',
        value: 'Partner/Owner',
      }),
      new ChoiceOption({
        label: 'Officer',
        value: 'Officer',
      }),
      new ChoiceOption({
        label: 'Authorised Signatory',
        value: 'Authorised Signatory',
      }),
      new ChoiceOption({
        label: 'Other',
        value: 'Other',
      }),
    ],
    jump: () => '0-personName',
  }),
  new QuestionModel({
    id: '0-TrustEntityName',
    title: 'What’s the name of the Entity owning the property?',
    subtitle: 'The name that you input here should be identical with the name on the property deed.',
    type: QuestionType.Text,
    required: true,
  }),
  new QuestionModel({
    id: '0-TrustEIN',
    title: 'What’s the property owner’s EIN?',
    type: QuestionType.Text,
    required: true,
  }),
  new QuestionModel({
    id: '0-isOwnerTrust',
    title: 'Are you the Trustee of ##EName##?',
    type: QuestionType.MultipleChoice,
    multiple: false,
    required: true,
    nextStepOnAnswer: true,
    allowOther: false,
    options: [
      new ChoiceOption({
        label: 'Yes',
        value: true,
      }),
      new ChoiceOption({
        label: 'No',
        value: false,
      }),
    ],
    jump: {
      true: '0-ownerTypeTrust',
      false: '0-personName',
    },
  }),
  new QuestionModel({
    id: '0-ownerTypeTrust',
    title: 'What\'s your position in the entity?',
    type: QuestionType.MultipleChoice,
    multiple: false,
    required: true,
    nextStepOnAnswer: true,
    allowOther: false,
    options: [
      new ChoiceOption({
        label: 'Trustee',
        value: 'Trustee',
      }),
      new ChoiceOption({
        label: 'Authorised Signatory',
        value: 'Authorised Signatory',
      }),
      new ChoiceOption({
        label: 'Other',
        value: 'Other',
      }),
    ],
    jump: () => '0-personName',
  }),
  new QuestionModel({
    id: '0-EstateEntityName',
    title: 'What’s the name of the Entity owning the property?',
    subtitle: 'The name that you input here should be identical with the name on the property deed.',
    type: QuestionType.Text,
    required: true,
  }),
  new QuestionModel({
    id: '0-EstateEIN',
    title: 'What’s the property owner’s EIN?',
    type: QuestionType.Text,
    required: true,
  }),
  new QuestionModel({
    id: '0-isOwnerEstate',
    title: 'Are you the Executor, Executrix or Administrator of ##EName##?',
    type: QuestionType.MultipleChoice,
    multiple: false,
    required: true,
    nextStepOnAnswer: true,
    allowOther: false,
    options: [
      new ChoiceOption({
        label: 'Yes',
        value: true,
      }),
      new ChoiceOption({
        label: 'No',
        value: false,
      }),
    ],
    jump: {
      true: '0-ownerTypeEstate',
      false: '0-personName',
    },
  }),
  new QuestionModel({
    id: '0-ownerTypeEstate',
    title: 'What\'s your position in the entity?',
    type: QuestionType.MultipleChoice,
    multiple: false,
    required: true,
    nextStepOnAnswer: true,
    allowOther: false,
    options: [
      new ChoiceOption({
        label: 'Executor',
        value: 'Executor',
      }),
      new ChoiceOption({
        label: 'Executrix',
        value: 'Executrix',
      }),
      new ChoiceOption({
        label: 'Administrator',
        value: 'Administrator',
      }),
      new ChoiceOption({
        label: 'Authorised Signatory,',
        value: 'Authorised Signatory,',
      }),
      new ChoiceOption({
        label: 'Other',
        value: 'Other',
      }),
    ],
    jump: () => '0-personName',
  }),
  new QuestionModel({
    id: '0-personName',
    title: 'What’s the registrant’s  name?',
    type: QuestionType.Text,
    required: true,
  }),
  // If you need to uncomment it, then you also need to enable jump in 0-name
  /*  new QuestionModel({
      id: '0-percentage',
      title: 'What’s your percentage in the property?',
      type: QuestionType.Text,
      required: true,
      money: {
        decimal: '.',
        thousands: '',
        prefix: '',
        suffix: ' %',
        precision: 2,
        masked: false,
      },
      jump: q => {
        if (q.answer < 100) {
          console.log('jump')
          return 'addNewOwner'
        }
        // if (q.answer > 100) {
        //   this.$toast('percentage must not be greater than 100',
        //     {
        //       type: 'warning',
        //     })
        //   return 'alreadyOwned'
        // }
        // return '_submit'
        return 'payment'
      },
    }), */
  new QuestionModel({
    id: 'addNewOwner',
    title: 'Is there another owner of the property?',
    type: QuestionType.MultipleChoice,
    multiple: false,
    required: true,
    nextStepOnAnswer: true,
    allowOther: false,
    options: [
      new ChoiceOption({
        label: 'Yes',
        value: true,
      }),
      new ChoiceOption({
        label: 'No',
        value: false,
      }),
    ],
    jump: {
      true: 'addNewOwnerEmail',
      // false: '_submit',
      false: 'payment',
    },
  }),
  new QuestionModel({
    id: 'addNewOwnerEmail',
    title: 'Please enter his/her email address',
    subtitle: 'We will send him/her an invitation email to register an account with Landlock',
    type: QuestionType.Email,
    required: false,
  }),
  // Payment
  new QuestionModel({
    id: 'payment',
    type: QuestionType.Payment,
    required: true,
  }),
]
export default REGISTER_PROPERTY_QUESTIONS
