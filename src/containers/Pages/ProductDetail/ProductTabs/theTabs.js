import React from 'react'
import Tab from '../../../../components/Tabs/Tab/Tab'
import TabThreePartSpecAndTechInfo from './Tabs/TabThreePartSpecAndTechInfo'
import TabDesign from './Tabs/TabDesign'
import TabWarranty from './Tabs/TabWarranty'
import TabApplicationGallery from './Tabs/TabApplicationGallery'
import TabBimRevit from './Tabs/TabBimRevit'

function getTheTabs (product) {
  let tabs = []

  // 3 part spec and tech info
  if (product.terms['technical_info'].length > 0) {
    tabs = [ ...tabs,
      <Tab
        key={1}
        text={`3-Part Spec and Technical Data`}
        isActive={false} >
        <TabThreePartSpecAndTechInfo
          techInfo={product.terms['technical_info']} />
      </Tab>
    ]
  }

  // Design
  if (product.meta['product_media'].videos !== '' ||
      product.meta['product_links'].length > 1 ||
      product.terms['literature'].length > 0) {
    tabs = [ ...tabs,
      <Tab
        key={2}
        text={`Design`}
        isActive={false} >
        <TabDesign
          videos={product.meta['product_media'].videos}
          links={product.meta['product_links']}
          literature={product.terms['literature']} />
      </Tab>
    ]
  }

  // Warranty
  if (product.meta['product_warranty']) {
    tabs = [ ...tabs,
      <Tab
        key={3}
        text={`Warranty`}
        isActive={false} >
        <TabWarranty
          warranty={product.meta['product_warranty']} />
      </Tab>
    ]
  }

  // Installation?
  // Maintenance?
  // Compliance?

  // Application Gallery
  if (product.terms['application_gallery'].length > 0) {
    tabs = [ ...tabs,
      <Tab
        key={4}
        text={`Application Gallery`}
        isActive={false} >
        <TabApplicationGallery
          appGallery={product.terms['application_gallery']} />
      </Tab>
    ]
  }

  // Bim Revit
  if (product.terms['bim_revit'].length > 0) {
    tabs = [ ...tabs,
      <Tab
        key={5}
        text={`BIM/Revit`}
        isActive={false} >
        <TabBimRevit
          bimRevit={product.terms['bim_revit']} />
      </Tab>
    ]
  }

  return tabs
}

export default getTheTabs
