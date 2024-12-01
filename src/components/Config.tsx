import { useAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { DownloadCloud, LogOut, RotateCw, Trash2 } from 'react-feather';
import { useTranslation } from 'react-i18next';
import * as logsApi from 'src/api/logs';
import { fetchVersion } from 'src/api/version';
import Select from 'src/components/shared/Select';
import { ClashGeneralConfig, DispatchFn, State } from 'src/store/types';
import { ClashAPIConfig } from 'src/types';

import {
  darkModePureBlackToggleAtom,
  getClashAPIConfig,
  getLatencyTestUrl,
  getSelectedChartStyleIndex,
} from '../store/app';
import { fetchConfigs, getConfigs, updateConfigs, reloadConfigs, flushFakeIPPool, updateGeoDatabasesFile } from '../store/configs';
import { openModal } from '../store/modals';
import Button from './Button';
import s0 from './Config.module.scss';
import ContentHeader from './ContentHeader';
import { ToggleInput } from './form/Toggle';
import Input, { SelfControlledInput } from './Input';
import { Selection2 } from './Selection';
import { connect, useStoreActions } from './StateProvider';
import TrafficChartSample from './TrafficChartSample';

const { useEffect, useState, useCallback, useRef, useMemo } = React;

const propsList = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];

const logLeveOptions = [
  ['debug', 'Debug'],
  ['info', 'Info'],
  ['warning', 'Warning'],
  ['error', 'Error'],
  ['silent', 'Silent'],
];

const portFields = [
  { key: 'port', label: 'HTTP Proxy Port' },
  { key: 'socks-port', label: 'SOCKS5 Proxy Port' },
  { key: 'mixed-port', label: 'Mixed Port' },
  { key: 'redir-port', label: 'Redir Port' },
  { key: 'tproxy-port', label: 'tProxy Port' },
];

const langOptions = [
  ['zh', '中文'],
  ['en', 'English'],
];

const mapState = (s: State) => ({
  configs: getConfigs(s),
  apiConfig: getClashAPIConfig(s),
});

const mapState2 = (s: State) => ({
  selectedChartStyleIndex: getSelectedChartStyleIndex(s),
  latencyTestUrl: getLatencyTestUrl(s),
  apiConfig: getClashAPIConfig(s),
});

const Config = connect(mapState2)(ConfigImpl);
export default connect(mapState)(ConfigContainer);

function ConfigContainer({
  dispatch,
  configs,
  apiConfig,
}: {
  dispatch: DispatchFn;
  configs: ClashGeneralConfig;
  apiConfig: ClashAPIConfig;
}) {
  useEffect(() => {
    dispatch(fetchConfigs(apiConfig));
  }, [dispatch, apiConfig]);
  return <Config configs={configs} />;
}

type ConfigImplProps = {
  dispatch: DispatchFn;
  configs: ClashGeneralConfig;
  selectedChartStyleIndex: number;
  latencyTestUrl: string;
  apiConfig: ClashAPIConfig;
};

function getBackendContent(version: any): string {
  if (version && version.meta && !version.premium) {
    return 'Clash.Meta ';
  } else if (version && version.meta && version.premium) {
    return 'sing-box ';
  } else {
    return 'Clash Premium';
  }
}

function ConfigImpl({
  dispatch,
  configs,
  selectedChartStyleIndex,
  latencyTestUrl,
  apiConfig,
}: ConfigImplProps) {
  const [configState, setConfigStateInternal] = useState(configs);
  const refConfigs = useRef(configs);
  useEffect(() => {
    if (refConfigs.current !== configs) {
      setConfigStateInternal(configs);
    }
    refConfigs.current = configs;
  }, [configs]);

  const openAPIConfigModal = useCallback(() => {
    dispatch(openModal('apiConfig'));
  }, [dispatch]);

  const setConfigState = useCallback(
    (name: keyof ClashGeneralConfig, val: ClashGeneralConfig[keyof ClashGeneralConfig]) => {
      setConfigStateInternal({ ...configState, [name]: val });
    },
    [configState],
  );

  const handleSwitchOnChange = useCallback(
    (checked: boolean) => {
      const name = 'allow-lan';
      const value = checked;
      setConfigState(name, value);
      dispatch(updateConfigs(apiConfig, { 'allow-lan': value }));
    },
    [apiConfig, dispatch, setConfigState],
  );

  const handleChangeValue = useCallback(
    ({ name, value }) => {
      switch (name) {
        case 'mode':
        case 'log-level':
          setConfigState(name, value);
          dispatch(updateConfigs(apiConfig, { [name]: value }));
          if (name === 'log-level') {
            logsApi.reconnect({ ...apiConfig, logLevel: value });
          }
          break;
        case 'tproxy-port':
        case 'redir-port':
        case 'socks-port':
        case 'mixed-port':
        case 'port':
          if (value !== '') {
            const num = parseInt(value, 10);
            if (num < 0 || num > 65535) return;
          }
          setConfigState(name, value);
          break;
        default:
          return;
      }
    },
    [apiConfig, dispatch, setConfigState],
  );

  const handleInputOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => handleChangeValue(e.target),
    [handleChangeValue],
  );

  const { selectChartStyleIndex, updateAppConfig } = useStoreActions();

  const handleInputOnBlur = useCallback<React.FocusEventHandler<HTMLInputElement>>(
    (e) => {
      const target = e.target;
      const { name, value } = target;
      switch (name) {
        case 'port':
        case 'socks-port':
        case 'mixed-port':
        case 'redir-port':
        case 'tproxy-port': {
          const num = parseInt(value, 10);
          if (num < 0 || num > 65535) return;
          dispatch(updateConfigs(apiConfig, { [name]: num }));
          break;
        }
        case 'latencyTestUrl': {
          updateAppConfig(name, value);
          break;
        }
        default:
          throw new Error(`unknown input name ${name}`);
      }
    },
    [apiConfig, dispatch, updateAppConfig],
  );

  const handleReloadConfigs = useCallback(() => {
    dispatch(reloadConfigs(apiConfig));
  },[apiConfig, dispatch]);

  const handleFlushFakeIPPool = useCallback(() => {
    dispatch(flushFakeIPPool(apiConfig));
  },[apiConfig, dispatch]);

  const handleUpdateGeoDatabasesFile = useCallback(() => {
    dispatch(updateGeoDatabasesFile(apiConfig));
  }, [apiConfig, dispatch]);

  const mode = useMemo(() => {
    const m = configState.mode;
    return typeof m === 'string' && m[0].toUpperCase() + m.slice(1);
  }, [configState.mode]);

  const [pureBlack, setPureBlack] = useAtom(darkModePureBlackToggleAtom);

  const { t, i18n } = useTranslation();

  const { data: version } = useQuery(['/version', apiConfig], () =>
    fetchVersion('/version', apiConfig)
  );

  const modeOptions = useMemo(() => {
    return configState["mode-list"] || configState.modes || ['Global', 'Rule', 'Direct'];
  }, [configState.modes]);

  return (
    <div>
      <ContentHeader title={t('Config')} />
      <div className={s0.root}>
        {(version.meta && version.premium) ||
          portFields.map((f) =>
            configState[f.key] !== undefined ? (
              <div key={f.key}>
                <div className={s0.label}>{f.label}</div>
                <Input
                  name={f.key}
                  value={configState[f.key]}
                  onChange={handleInputOnChange}
                  onBlur={handleInputOnBlur}
                />
              </div>
            ) : null
          )}

        <div>
          <div className={s0.label}>Mode</div>
          <Select
            options={modeOptions.map((mode) => [mode, mode])}
            selected={mode}
            onChange={(e) => handleChangeValue({ name: 'mode', value: e.target.value })}
          />
        </div>

        <div>
          <div className={s0.label}>Log Level</div>
          <Select
            options={logLeveOptions}
            selected={configState['log-level']}
            onChange={(e) => handleChangeValue({ name: 'log-level', value: e.target.value })}
          />
        </div>

        {(version.meta && version.premium) || (
          <div>
          <div className={s0.item}>
            <ToggleInput
              id="config-allow-lan"
              checked={configState['allow-lan']}
              onChange={handleSwitchOnChange}
            />
            <label htmlFor="config-allow-lan">Allow LAN</label>
          </div>
        </div>
        )}
      </div>

      <div className={s0.sep}>
        <div />
      </div>

      <div className={s0.section}>
        <div>
          <div className={s0.label}>Reload</div>
          <Button
              start={<RotateCw size={16} />}
              label={t('reload_config_file')}
              onClick={handleReloadConfigs}
          />
        </div>
        <div>
          <div className={s0.label}>FakeIP</div>
          <Button
              start={<Trash2 size={16} />}
              label={t('flush_fake_ip_pool')}
              onClick={handleFlushFakeIPPool}
          />
        </div>
        {(version.meta && version.premium) || (
        <div>
          <div className={s0.label}>GEO Databases</div>
          <Button
              start={<DownloadCloud size={16} />}
              label={t('update_geo_databases_file')}
              onClick={handleUpdateGeoDatabasesFile}
          />
        </div>
        )}
      </div>

      <div className={s0.sep}>
        <div />
      </div>

      <div className={s0.section}>
        <div>
          <div className={s0.label}>{t('latency_test_url')}</div>
          <SelfControlledInput
            name="latencyTestUrl"
            type="text"
            value={latencyTestUrl}
            onBlur={handleInputOnBlur}
          />
        </div>
        <div>
          <div className={s0.label}>{t('lang')}</div>
          <div>
            <Select
              options={langOptions}
              selected={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className={s0.label}>{t('chart_style')}</div>
          <Selection2
            OptionComponent={TrafficChartSample}
            optionPropsList={propsList}
            selectedIndex={selectedChartStyleIndex}
            onChange={selectChartStyleIndex}
          />
        </div>
        <div>
          <div className={s0.label}>
            {t('current_backend')}
            <p>{getBackendContent(version) + apiConfig.baseURL}</p>
          </div>
          <div className={s0.label}>Action</div>
          <Button
            start={<LogOut size={16} />}
            label={t('switch_backend')}
            onClick={openAPIConfigModal}
          />
        </div>
        <div className={s0.item}>
          <ToggleInput
            id="dark-mode-pure-black-toggle"
            checked={pureBlack}
            onChange={setPureBlack}
          />
          <label htmlFor="dark-mode-pure-black-toggle">
            {t('dark_mode_pure_black_toggle_label')}
          </label>
        </div>
      </div>
    </div>
  );
}
