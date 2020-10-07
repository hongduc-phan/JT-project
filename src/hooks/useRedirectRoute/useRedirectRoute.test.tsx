import {renderHook, cleanup, act} from 'react-hooks-testing-library';
import useRedirectRoute from './useRedirectRoute';

describe('useRedirectRoute', () => {
  afterEach(cleanup);

  it('Should not return redirect element in init', () => {
    const {result} = renderHook(() => useRedirectRoute());
    const [ShouldRedirect] = result.current;
    expect(ShouldRedirect).toEqual(undefined);
  });

  it('Should return element Redirect when set redirect', () => {
    const {result} = renderHook(() => useRedirectRoute());
    const [, setRedirect] = result.current;
    act(() => {
      setRedirect('/home');
    });
    const [ShouldRedirect] = result.current;
    expect(ShouldRedirect && ShouldRedirect.props.to).toEqual('/home');
  });

  it('Should return element Redirect when set redirect handler', () => {
    const {result} = renderHook(() => useRedirectRoute());
    const [, , setRedirectHandler] = result.current;
    act(() => {
      setRedirectHandler('/login')();
    });
    const [ShouldRedirect] = result.current;
    expect(ShouldRedirect && ShouldRedirect.props.to).toEqual('/login');
  });

  it('Should pass redirect props to <Redirect/>', () => {
    const {result} = renderHook(() =>
      useRedirectRoute({
        redirectProps: {
          exact: true,
        },
      }),
    );
    const [, , setRedirectHandler] = result.current;
    act(() => {
      setRedirectHandler('/login')();
    });
    const [ShouldRedirect] = result.current;
    expect(ShouldRedirect && ShouldRedirect.props.exact).toBeTruthy();
  });
});
