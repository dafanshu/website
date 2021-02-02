import React, { useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { colors, borders } from '../styles/variables'
import { jobs } from '../pages/careers'

const AnnoucementBannerWrapper = styled.div`
    position: relative;
    background: ${colors.link};
    transition: all 0.3s;

    button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 2rem;
        border: none;
        border-radius: 50%;

        @media(max-width: 320px) {
            right: .5rem;
        }
    }

    svg {
        display: block;
        height: 2.6rem;
        width: 2.6rem;
        transition: all 0.2s;
        fill: ${colors.link};

        &:hover {
            fill: ${colors.lightBlue};
        }
    }

    .cross {
        stroke: ${colors.white};
        transition: all .2s;
    }
`

const StyledAnnouncementBanner = styled(Link)`
  color: ${colors.white};
  font-weight: 400;
  border-bottom: ${borders.light};

  &:hover,
  &:focus {
      color: ${colors.white};
  }

  @media (max-width: 600px) {
    font-size: 85%;
  }

  .text {
    padding: 1rem 0;
    text-align: center;

    @media(max-width: 320px) {
        padding: .8rem;
    } 
  }

  .emojis {
      margin: 0 1rem;
      letter-spacing: 3px;

      @media(max-width: 320px) {
        margin: 0 .5rem;
      }
  }

  .openings {
    background: ${colors.lightBlue};
    font-size: 90%;
    padding: .5rem 1rem;
    border-radius: 10rem;
  }
`;

function markWasDisplayed(): void {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('wasDisplayed', 'true');
    }
}

function wasDisplayed(): boolean {
    if (typeof localStorage !== 'undefined') {
        // @ts-ignore
        return localStorage.getItem('wasDisplayed')
    }
    return false;
}

const AnnoucementBanner = () => {
    const bannerRef = useRef<any>(null)

    const hideTheBanner = () => {
        if (null !== bannerRef.current) {
            bannerRef.current.style.transform = 'translateY(-100%)'
            bannerRef.current.style.marginTop = `-${bannerRef.current.offsetHeight}px`
        }

        // @ts-ignore
        markWasDisplayed(true);

        setTimeout(() => {
            if (null !== bannerRef.current) {
                bannerRef.current.style.display = 'none'
            }
        }, 300)
    }

    useEffect(() => {
        const wasAlreadyDisplayed = wasDisplayed();
        if (wasAlreadyDisplayed) {
            if (null !== bannerRef.current) {
                bannerRef.current.style.display = 'none';
            }
        }
    })

    return (
        <AnnoucementBannerWrapper ref={bannerRef} style={{
            display:
                wasDisplayed() ? 'none' :
                    'inline'
        }}>
            <StyledAnnouncementBanner to="/careers/#jobs">
                <div className="row">
                    <div className="text">
                        <span className="wrapper">We're hiring!<span className="emojis">🌈 🌎</span></span>
                        <span className="openings">
                            <strong>{jobs.length}</strong>
                            &nbsp;Openings
                        </span>
                    </div>
                </div>
            </StyledAnnouncementBanner>
            <button
                aria-label="Close"
                onClick={() => {
                    hideTheBanner()
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="29.86" height="29.86" data-name="Banner closing" viewBox="0 0 30.86 30.86">
                    <g data-name="Gruppe 950">
                        <g data-name="Pfad 1398">
                            <path d="M14.93 29.86a14.93 14.93 0 1114.93-14.93 14.93 14.93 0 01-14.93 14.93z"></path>
                            <path
                                className="outline"
                                d="M14.93 27.86c3.454 0 6.7-1.345 9.143-3.787a12.845 12.845 0 003.787-9.143c0-3.454-1.345-6.7-3.787-9.143A12.845 12.845 0 0014.93 2c-3.454 0-6.7 1.345-9.143 3.787A12.845 12.845 0 002 14.93c0 3.454 1.345 6.7 3.787 9.143a12.845 12.845 0 009.143 3.787m0 2C6.684 29.86 0 23.176 0 14.93 0 6.684 6.684 0 14.93 0c8.246 0 14.93 6.684 14.93 14.93 0 8.246-6.684 14.93-14.93 14.93z"
                            ></path>
                        </g>
                    </g>
                    <g className="cross" strokeLinecap="round" strokeWidth="2" data-name="Gruppe 1035">
                        <path d="M9.779 10.1l11.009 9.967" data-name="Pfad 940"></path>
                        <path d="M10.373 20.2l10.1-10.1" data-name="Linie 102"></path>
                    </g>
                </svg>
            </button>
        </AnnoucementBannerWrapper>
    )
}

export default AnnoucementBanner
