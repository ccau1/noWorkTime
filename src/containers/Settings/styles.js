module.exports = require('react-native').StyleSheet.create({
  heading: {
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 20,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#444',
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  btnCircleContainer: {
    borderRadius: 40,
    padding: 12,
    paddingLeft: 15,
    paddingRight: 15,
  },
  btnCircleContainerActive: {
    backgroundColor: '#2980b9',
    borderRadius: 40,
    padding: 12,
    paddingLeft: 15,
    paddingRight: 15,
  },
  btnCircleActive: {
    color: '#FFF'
  },
  inputNumber: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginBottom: 20,
    color: '#000',
    paddingHorizontal: 10,
    flex: 1,
    width: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginBottom: 20,
    color: '#000',
    paddingHorizontal: 10,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    width: null,
    height: null,
  },
  settingsFormContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  bottomContainer: {
    alignItems: 'center',
  },
  btnClose: {
    padding: 50,
    color: '#000'
  }
});
