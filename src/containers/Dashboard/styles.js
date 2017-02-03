module.exports = require('react-native').StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statDisplayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {

  },
  btnSettings: {
    color: '#FFF',
    padding: 50,
  },
  statButton: {
    backgroundColor: 'blue',
  },
  bgImage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
    color: '#FFF',
  },
  statText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
