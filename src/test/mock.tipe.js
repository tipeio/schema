module.exports = {
  templates: {
    home: {
      name: 'Home',
      fields: {
        signup: {
          name: 'sign up button text',
          type: 'button'
        },
        signin: {
          name: 'sign in button text',
          type: 'button'
        },
        askUsCta: {
          name: 'ask us cta',
          type: 'button'
        },
        publishCta: {
          name: 'publish cta',
          type: 'button'
        },
        reliableCta: {
          name: 'reliable cta',
          type: 'button'
        },
        heroHeader: {
          name: 'hero header',
          type: 'text',
          mocks: ['Content is data. Treat it right.']
        },
        heroBody: {
          name: 'hero body',
          type: 'text',
          mocks: [
            'Tipe is the Content Delivery Service that fits every app and works the way you write.'
          ]
        },
        heroCtaButton: {
          name: 'hero cta button',
          type: 'button',
          mocks: ['try tipe today']
        },
        heroImage: {
          name: 'hero image',
          type: 'image'
        },
        mainImage: {
          name: 'main image',
          type: 'image'
        },
        section1Header: {
          name: 'section 1 header',
          type: 'text',
          mocks: ['Seamless integration with any app , so you can']
        },
        section1Subheader: {
          name: 'section 1 subheader',
          type: 'text',
          mocks: ['focus on shipping, not content']
        },
        shipCta: {
          name: 'ship cta',
          type: 'button',
          mock: ['Shop code, not content']
        },
        liveContentHeader: {
          name: 'live content header',
          type: 'text',
          mocks: ['Let the words be free']
        },
        liveContentSubheader: {
          name: 'live content subheader',
          type: 'text',
          mocks: ['Live content as quick as you can write it']
        },
        reliableHeader: {
          name: 'reliable header',
          type: 'text',
          mocks: [
            'A reliable product built by a team you can trust -- and it’s fast as heck too.'
          ]
        },
        liveContentImage: {
          name: 'live content image',
          type: 'image'
        },
        reliableImage: {
          name: 'reliable image',
          type: 'image'
        },
        bottomHeader: {
          name: 'bottom header',
          type: 'text',
          mocks: ['Start Building your App with a Modern CMS']
        },
        bottomSubheader: {
          name: 'bottom subheader',
          type: 'text',
          mocks: ['No Credit Card Required to Create an Account.']
        },
        footerTitle: {
          name: 'Footer Title',
          type: 'text',
          mocks: [
            'Tipe. A headless CMS platform built for developers by developers.'
          ]
        }
      },
      refs: {
        featureSet1: {
          name: 'feature set 1',
          type: 'feature'
        },
        featureSet2: {
          name: 'feature set 2',
          type: 'feature'
        },
        featureSet3: {
          name: 'feature set 3',
          type: 'feature'
        },
        featureSet4: {
          name: 'feature set 4',
          type: 'feature'
        },
        featureSet5: {
          name: 'feature set 5',
          type: 'feature'
        },
        featureSet6: {
          name: 'feature set 6',
          type: 'feature'
        },
        featureSet7: {
          name: 'feature set 7',
          type: 'feature'
        },
        featureSet8: {
          name: 'feature set 8',
          type: 'feature'
        },
        featureSet9: {
          name: 'feature set 9',
          type: 'feature'
        }
      }
    },
    feature: {
      name: 'Feature',
      id: 'feature',
      fields: {
        image: {
          type: 'image',
          name: 'feature image'
        },
        header: {
          type: 'text',
          name: 'feature header'
        },
        subHeader: {
          type: 'text',
          name: 'feature subheader'
        }
      }
    },
    devDocs: {
      name: 'Dev Documentation',
      fields: {
        title: {
          name: 'Title',
          type: 'text'
        },
        banner: {
          name: 'Banner Image',
          type: 'image'
        },
        content: {
          name: 'Documentation',
          type: 'markdown'
        }
      }
    }
  }
}
