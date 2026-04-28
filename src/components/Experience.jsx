import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Fade } from 'react-awesome-reveal';
// eslint-disable-next-line import/no-unresolved
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
// eslint-disable-next-line import/no-unresolved
import 'react-vertical-timeline-component/style.min.css';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/experience.css';

const styles = {
  ulStyle: {
    listStylePosition: 'outside',
    paddingLeft: 20,
  },
  subtitleContainerStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
  subtitleStyle: {
    display: 'inline-block',
  },
  inlineChild: {
    display: 'inline-block',
  },
  itemStyle: {
    marginBottom: 10,
  },
};

function Experience(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.experiences, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res.experiences))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />

      {data
        ? (
          <div
            className="section-content-container"
            style={{ '--experience-date-color': theme.color }}
          >
            <Container>
              <VerticalTimeline lineColor={theme.timelineLineColor} layout="2-columns">
                {data.map((item, index) => (
                  <Fade key={item.title + item.dateText}>
                    <VerticalTimelineElement
                      key={item.title + item.dateText}
                      position={index % 2 === 0 ? 'left' : 'right'}
                      contentStyle={{
                        ...styles.itemStyle,
                        background: theme.cardBackground,
                        border: `1px solid ${theme.cardBorderColor}`,
                        color: theme.color,
                        boxShadow: 'none',
                      }}
                      contentArrowStyle={{
                        borderRight: `7px solid ${theme.cardBackground}`,
                      }}
                      dateClassName="experience-date"
                      iconStyle={{
                        background: theme.accentColor,
                        boxShadow: `0 0 0 4px ${theme.background}`,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                      }}
                      icon={<span>{item.dateText}</span>}
                    >
                      <h2 className="item-title">
                        {item.title}
                      </h2>
                      <div style={styles.subtitleContainerStyle}>
                        <h4 style={{ ...styles.subtitleStyle, color: theme.accentColor }}>
                          {item.subtitle}
                        </h4>
                        {item.workType && (
                        <h5 style={styles.inlineChild}>
                    &nbsp;·
                          {' '}
                          {item.workType}
                        </h5>
                        )}
                      </div>
                      <ul style={styles.ulStyle}>
                        {item.workDescription.map((point) => (
                          <div key={point}>
                            <li>
                              <ReactMarkdown
                                children={point}
                                components={{
                                  p: 'span',
                                }}
                              />
                            </li>
                            <br />
                          </div>
                        ))}
                      </ul>
                    </VerticalTimelineElement>
                  </Fade>
                ))}
              </VerticalTimeline>
            </Container>
          </div>
        ) : <FallbackSpinner /> }
    </>
  );
}

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;
