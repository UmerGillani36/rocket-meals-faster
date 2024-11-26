import { ScrollView, Text } from 'react-native';
import React, { useEffect } from 'react';
import styles from './styles';
import { constants } from '@/constants/privacy-policy';
import { useTheme } from '@/context/ThemeContext';
import RedirectButton from '@/components/RedirectButton';
import CustomCollapsible from '@/components/CustomCollapsible/CustomCollapsible';

const index = () => {
  const { theme, setThemeMode } = useTheme();

  useEffect(() => {
    setThemeMode('dark');
  }, []);

  return (
    <ScrollView
      style={{ ...styles.container, backgroundColor: theme.screen.background }}
    >
      <Text style={{ ...styles.body, color: theme.screen.text }}>
        {constants.para1}
      </Text>
      <Text style={{ ...styles.body, color: theme.screen.text }}>
        {constants.para2}
      </Text>
      <Text style={{ ...styles.body, color: theme.screen.text }}>
        {constants.para3}
      </Text>
      <Text style={{ ...styles.body, color: theme.screen.text }}>
        {constants.para4}
      </Text>
      <Text style={{ ...styles.label, color: theme.screen.text }}>E-Mail:</Text>
      <RedirectButton type={'email'} label='info@baumgratner-software.de' />
      <Text style={{ ...styles.label, color: theme.screen.text }}>
        Website:
      </Text>
      <RedirectButton type={'link'} label='info@baumgratner-software.de' />
      <Text style={{ ...styles.body, color: theme.screen.text }}>
        {constants.para5}
      </Text>
      <Text style={{ ...styles.body, color: theme.screen.text }}>Imprint</Text>
      <Text style={{ ...styles.body, color: theme.screen.text }}>
        The following information contains the legally required information on
        provider identification as well as legal information on the website and
        app.
      </Text>
      <Text style={{ ...styles.body, color: theme.screen.text }}>
        Declaration on accessibility
      </Text>
      <Text style={{ ...styles.body, color: theme.screen.text }}>
        We endeavor to make this website and mobile application accessible in
        accordance with national legislation implementing Directive (EU)
        2016/2102 of the European Parliament and of the Council on the
        accessibility of the websites and mobile applications of public sector
        bodies.
      </Text>
      <Text style={{ ...styles.body, color: theme.screen.text }}>
        We are working on successively removing existing barriers.
      </Text>
      <Text style={{ ...styles.body, color: theme.screen.text }}>
        The General Terms and Conditions (GTC) for the use of the app are set
        out below:
      </Text>
      <Text style={{ ...styles.body, color: theme.screen.text }}>
        #4 Ratings and comments - Reviews and comments must be honest and
        factual. - It is prohibited to manipulate ratings and comments or spread
        false information.
      </Text>
      <Text style={{ ...styles.body, color: theme.screen.text }}>Imprint</Text>
      <Text style={{ ...styles.body, color: theme.screen.text }}>
        The following information contains the legally required information on
        provider identification as well as legal information on the website and
        app.
      </Text>
      <Text style={{ ...styles.body, color: theme.screen.text }}>
        Our website and our special app (hereinafter "app") can be used without
        disclosing personal data, with the exception of short-term storage of
        log files (e.g. IP addresses, access times) to ensure security. However,
        if you provide certain personal data (for example in the course of
        contacting us by email or logging in with external providers such as
        Google, Apple and others), such as your name, place of residence or
        email address, this is always done on a voluntary basis and with your
        express consent.
      </Text>
      <Text style={{ ...styles.body, color: theme.screen.text }}>
        Name and address of the controller:
      </Text>
      <Text style={{ ...styles.body, color: theme.screen.text }}>
        The controller within the meaning of the General Data Protection
        Regulation (GDPR) and other national data protection laws of the member
        states as well as other data protection regulations is
      </Text>
      <Text style={{ ...styles.body, color: theme.screen.text }}>
        Baumgartner Software UG (haftungsbeschränkt) Bernhardstraße 20, 49413
        Dinklage Phone: +49 170 2215430 E-Mail: info@baumgartner-software.de
        Managing director: Nils Baumgartner Tax number: 68/213/02808 Sales tax
        identification number: DE 362633044
      </Text>
      <Text style={{ ...styles.label, color: theme.screen.text }}>E-Mail:</Text>
      <RedirectButton type={'email'} label='info@baumgratner-software.de' />
      <Text style={{ ...styles.label, color: theme.screen.text }}>
        Website:
      </Text>
      <RedirectButton type={'link'} label='info@baumgratner-software.de' />
      <Text style={{ ...styles.body, color: theme.screen.text }}>
        With this privacy policy, we inform you about our processing of personal
        data in accordance with Art. 12 et seq. GDPR. Personal data means any
        information relating to an identified or identifiable natural person. In
        addition, we inform you about the legal basis for the processing of your
        data and - insofar as the processing is necessary to protect our
        legitimate interests - also about our legitimate interests and your
        rights.
      </Text>
      <CustomCollapsible headerText='Legal basis'>
        <Text style={{ ...styles.contentText, color: theme.screen.text }}>
          We process personal data in accordance with the provisions
        </Text>
      </CustomCollapsible>
      <Text style={{ ...styles.body, color: theme.screen.text }}>
        Changes to this privacy policy
      </Text>
      <Text style={{ ...styles.body, color: theme.screen.text }}>
        We always keep this privacy policy up to date. We therefore reserve the
        right to amend it from time to time and to update changes to the
        collection, processing or use of your data. The current version of the
        privacy policy is always available under "Privacy policy" within the
        app.
      </Text>
      <Text style={{ ...styles.body, color: theme.screen.text }}>
        Status: 16.09.2024
      </Text>
    </ScrollView>
  );
};

export default index;
