```js
<LightboxV2
  renderChildren={openLightbox => {
    return <button onClick={openLightbox}>Open Me!</button>
  }}
  renderLightboxContents={() => {
    return (
      <LightboxTitleBannerContentBox title={'This is the title'}>
        {
          'Im a div making clear the lightbox size. The lightbox currently snaps to my size. Click anywhere outside the lightbox to close. Try resizing the screen. Have a play with the style of this content element and the lightbox props'
        }
      </LightboxTitleBannerContentBox>
    )
  }}
  fitLightboxToContent
  fullWidth={true}
  maxWidth={'800px'}
/>
```
