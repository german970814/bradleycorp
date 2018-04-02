```jsx
<FixedAspectRatioBox>
  <LightboxYoutube>
    <BCorpVideo
      url={'https://www.youtube.com/watch?v=DOIePdmAw60'}
      youtubeProps={{
        opts: {
          width: '100%',
          height: '100%',
          playerVars: {
            showinfo: 0,
            modestbranding: 1,
            controls: 1
          }
        }
      }}
    />

    <FixedAspectRatioBox>
      <BCorpVideo
        url={'https://www.youtube.com/watch?v=DOIePdmAw60'}
        youtubeProps={{
          opts: {
            width: '100%',
            height: '100%',
            playerVars: {
              showinfo: 0,
              modestbranding: 1,
              controls: 1
            }
          }
        }}
        autoplay
      />
    </FixedAspectRatioBox>
  </LightboxYoutube>
</FixedAspectRatioBox>
```
