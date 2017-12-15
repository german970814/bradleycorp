const productObjectShape = {
  product: {
    post: {
      'ID': 0,
      'post_title': '',
      'post_content': ''
    },
    meta: {
      'product_sku': undefined,
      'product_media': {
        'images': [ '' ],
        'videos': ''
      },
      'product_new_until': undefined,
      'product_awards': [],
      'product_links': [],
      'product_warranty': undefined,
      'product_cta': undefined,
    },
    terms: {
      'product_category': [],
      'similar_product': [],
      'purchased_with': [],
      'technical_info': [],
      'case_studies': [],
      'bim_revit': [],
      'literature': [],
      'application_gallery': []
    },
    media: {
      'featured_image': [ '' ]
    }
  },
  tabs: {},
  'purchased_with': [],
  'similar': []
}

export default productObjectShape
