import React from 'react'
import Tab from '../../../Tabs/Tab/Tab'
import TabThreePartSpecAndTechData from './Tabs/TabThreePartSpecAndTechData/TabThreePartSpecAndTechData'
import TabDesign from './Tabs/TabDesign/TabDesign'
import TabCaseStudies from './Tabs/TabCaseStudies/TabCaseStudies'
import TabWarranty from './Tabs/TabWarranty/TabWarranty'
import TabInstallation from './Tabs/TabInstallation/TabInstallation'
import TabMaintenance from './Tabs/TabMaintenance/TabMaintenance'
import TabCompliance from './Tabs/TabCompliance/TabCompliance'
import TabApplicationGallery from './Tabs/TabApplicationGallery/TabApplicationGallery'
import TabBimRevit from './Tabs/TabBimRevit/TabBimRevit'

function getTheTabs (tabsData) {
  let tabs = []

  // 3 part spec and tech info
  if (tabsData['three_part_spec']['three_part_spec'].length > 0 ||
      tabsData['three_part_spec']['technical_data'].length > 0) {
    tabs = [ ...tabs,
      <Tab
        key={1}
        text={`3-Part Spec and Technical Data`}
        isActive={false} >
        <TabThreePartSpecAndTechData
          threePartSpec={tabsData['three_part_spec']['three_part_spec']}
          technicalData={tabsData['three_part_spec']['technical_data']} />
      </Tab>
    ]
  }

  // Design
  if (tabsData.design.videos.length > 0 ||
      tabsData.design.links.length > 1 ||
      tabsData.design.literature.length > 0 ||
      tabsData.design.colors.length > 0) {
    tabs = [ ...tabs,
      <Tab
        key={2}
        text={`Design`}
        isActive={false} >
        <TabDesign
          videos={tabsData.design.videos}
          links={tabsData.design.links}
          literature={tabsData.design.literature}
          colors={tabsData.design.colors} />
      </Tab>
    ]
  }

  // Case Studies
  if (tabsData['case_study'].length > 0) {
    tabs = [ ...tabs,
      <Tab
        key={3}
        text={`Case Studies`}
        isActive={false} >
        <TabCaseStudies
          caseStudies={tabsData['case_study']} />
      </Tab>
    ]
  }

  // Warranty
  if (tabsData.warranty.length > 0) {
    tabs = [ ...tabs,
      <Tab
        key={4}
        text={`Warranty`}
        isActive={false} >
        <TabWarranty
          warranty={tabsData.warranty} />
      </Tab>
    ]
  }

  // Installation
  if (tabsData.installation.guides.length > 0 ||
      tabsData.installation.videos.length > 0) {
    tabs = [ ...tabs,
      <Tab
        key={5}
        text={`Installation`}
        isActive={false} >
        <TabInstallation
          guides={tabsData.installation.guides}
          videos={tabsData.installation.videos} />
      </Tab>
    ]
  }

  // Maintenance
  if (tabsData.maintenance.guides.length > 0 ||
      tabsData.maintenance.videos.length > 0) {
    tabs = [ ...tabs,
      <Tab
        key={6}
        text={`Maintenance`}
        isActive={false} >
        <TabMaintenance
          guides={tabsData.maintenance.guides}
          videos={tabsData.maintenance.videos} />
      </Tab>
    ]
  }

  // Compliance
  if (tabsData.compliance.length > 0) {
    tabs = [ ...tabs,
      <Tab
        key={7}
        text={`Compliance`}
        isActive={false} >
        <TabCompliance
          compliance={tabsData.compliance} />
      </Tab>
    ]
  }

  // Application Gallery
  if (tabsData['application_gallery'].length > 0) {
    tabs = [ ...tabs,
      <Tab
        key={8}
        text={`Application Gallery`}
        isActive={false} >
        <TabApplicationGallery
          applicationGalleries={tabsData['application_gallery']} />
      </Tab>
    ]
  }

  // Bim Revit
  if (tabsData['bim_revit'].length > 0) {
    tabs = [ ...tabs,
      <Tab
        key={9}
        text={`BIM/Revit`}
        isActive={false} >
        <TabBimRevit
          bimRevit={tabsData['bim_revit']} />
      </Tab>
    ]
  }

  return tabs
}

export default getTheTabs
